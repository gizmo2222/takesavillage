r"""Remove the dates and the street address from the Constellations flier.

Works from the first, untouched version of the artwork (git 0edda09), so the
stars and the constellation that the May 19 removal darkened come back as drawn.

Three things are taken out for each block of lettering:
  1. the letters themselves (plus 6px of soft, speckled edge), repainted with the local
     average of the clean picture and real grain from neighbouring pixels;
  2. the soft dark halo the artwork has around its lettering (it reaches about
     15px), lifted back to the level of the picture around it, keeping every
     star and speck that is there. Without this a dark cloud in the shape of
     the text block stays behind;
  3. nothing else: the halo of the line that stays ("The Village, Van Nuys, CA")
     is left as it is.

usage (PowerShell, from the repo root; needs opencv-python and numpy):
    python docs\retouch-flier.py git:0edda09:flier.jpg flier-clean.jpg
"""
import sys
import cv2
import numpy as np

src, dst = sys.argv[1], sys.argv[2]
debug = sys.argv[3] if len(sys.argv) > 3 else None

if src.startswith('git:'):
    import subprocess
    raw = subprocess.run(['git', 'show', src[4:]], capture_output=True, check=True).stdout
    img = cv2.imdecode(np.frombuffer(raw, np.uint8), cv2.IMREAD_COLOR)
else:
    img = cv2.imread(src)
H, W = img.shape[:2]
f32 = img.astype(np.float32)
lum = img.max(axis=2).astype(np.int32)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)

# (x0, y0, x1, y1, brightness threshold)
REMOVE = {
    'dates': (296, 816, 614, 924, 70),
    'address': (268, 987, 626, 1036, 80),
}
KEEP = {
    'venue': (190, 932, 705, 987, 80),
}
HALO = 16  # px: how far the dark halo around lettering reaches
CORE = int(sys.argv[4]) if len(sys.argv) > 4 else 13  # px across: letters plus the speckled JPEG edge beside them are repainted


def letters(box):
    x0, y0, x1, y1, thr = box
    m = np.zeros((H, W), np.uint8)
    sub = (lum[y0:y1, x0:x1] > thr).astype(np.uint8)
    rows = np.where(sub.sum(axis=1) > 0)[0]
    print('  rows', y0 + rows.min(), y0 + rows.max(), 'px', int(sub.sum()))
    m[y0:y1, x0:x1] = sub
    return m


def dist_to(m):
    return cv2.distanceTransform(1 - m, cv2.DIST_L2, 5)


keep = np.zeros((H, W), np.uint8)
for name, box in KEEP.items():
    print('keep', name)
    keep |= letters(box)
d_keep = dist_to(keep)

gain = np.ones((H, W), np.float32)
rem_all = np.zeros((H, W), np.uint8)
profiles = {}
for name, box in REMOVE.items():
    print('remove', name)
    m = letters(box)
    rem_all |= m
    d = dist_to(m)
    x0, y0, x1, y1, _ = box
    near = np.zeros((H, W), bool)
    near[y0 - 26:y1 + 26, x0 - 26:x1 + 26] = True
    near &= d_keep > HALO + 4            # measure the halo away from the line that stays
    far = np.median(gray[near & (d >= HALO) & (d < HALO + 8)])
    prof = np.ones(HALO + 1, np.float32)
    for k in range(2, HALO):
        prof[k] = min(1.0, np.median(gray[near & (d >= k) & (d < k + 1)]) / far)
    prof[:2] = prof[2]
    prof = np.maximum.accumulate(prof)   # the halo only ever fades outwards
    profiles[name] = prof
    print('  far level %.1f, halo' % far, ' '.join('%.2f' % v for v in prof[2:]))
    f_rem = np.interp(np.minimum(d, HALO), np.arange(HALO + 1), prof)
    f_keep = np.interp(np.minimum(d_keep, HALO), np.arange(HALO + 1), prof)
    # where the staying line's own halo is at least as dark, change nothing
    g = np.maximum(f_keep, f_rem) / f_rem
    g = np.where(d_keep <= d, 1.0, g)
    gain = np.maximum(gain, g.astype(np.float32))

gain = cv2.GaussianBlur(gain, (0, 0), 1.0)
lifted = f32 * gain[..., None]

core = cv2.dilate(rem_all, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (CORE, CORE))) > 0

# 1. letters: local average of the clean (halo-free) picture, tightest scale first
pre = cv2.GaussianBlur(lifted, (0, 0), 2.0)
ok = ~(cv2.dilate(rem_all, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (CORE + 2, CORE + 2))) > 0)
ok &= (lifted - pre).max(axis=2) < 10        # no stars in the average
ok &= d_keep > 4
wgt = ok.astype(np.float32)
fill = np.zeros_like(f32)
have = np.zeros((H, W), np.float32)
for sigma in (2, 3, 5, 8, 13):
    num = cv2.GaussianBlur(lifted * wgt[..., None], (0, 0), sigma)
    den = cv2.GaussianBlur(wgt, (0, 0), sigma)
    conf = np.clip(den / 0.3, 0, 1) * (1 - have)
    fill += (num / np.maximum(den, 1e-4)[..., None]) * conf[..., None]
    have += conf
fill /= np.maximum(have, 1e-4)[..., None]
base = np.where(core[..., None], fill, lifted)

# 2. grain for the repainted letters, copied from the nearest clean pixels
high = lifted - cv2.GaussianBlur(base, (0, 0), 2.2)
clean = ok & (np.abs(high).max(axis=2) < 14)   # a star must not be copied into a letter
grain = np.zeros_like(f32)
todo = core.copy()
shifts = [(dx, dy) for r in (9, 13, 18, 25, 34) for dx, dy in
          ((r, 0), (-r, 0), (0, r), (0, -r), (r, r // 2), (-r, r // 2), (r, -r // 2), (-r, -r // 2))]
rng = np.random.default_rng(7)
ys, xs = np.where(core)
y0, y1, x0, x1 = max(ys.min() - 60, 0), min(ys.max() + 60, H), max(xs.min() - 60, 0), min(xs.max() + 60, W)
roi = (slice(y0, y1), slice(x0, x1))
c_roi, h_roi, t_roi, g_roi = clean[roi], high[roi], todo[roi].copy(), grain[roi]
n = len(shifts)
tiles = rng.integers(0, n, size=((y1 - y0) // 4 + 1, (x1 - x0) // 4 + 1))
pick = np.kron(tiles, np.ones((4, 4), int))[:y1 - y0, :x1 - x0]
for k in range(n):
    if not t_roi.any():
        break
    for i, (dx, dy) in enumerate(shifts):
        take = t_roi & ((pick + k) % n == i)
        if not take.any():
            continue
        take &= np.roll(c_roi, (dy, dx), axis=(0, 1))
        g_roi[take] = np.roll(h_roi, (dy, dx), axis=(0, 1))[take]
        t_roi &= ~take
todo = np.zeros_like(todo)
todo[roi] = t_roi
print('letter pixels without a grain donor:', int(todo.sum()))

out = base.copy()
out[core] = cv2.GaussianBlur(base, (0, 0), 1.0)[core] + grain[core]

# soft join between repainted letters and the picture
alpha = np.clip(cv2.GaussianBlur(core.astype(np.float32), (0, 0), 1.0) * 1.6, 0, 1)[..., None]
res = np.clip(lifted * (1 - alpha) + out * alpha, 0, 255).astype(np.uint8)

cv2.imwrite(dst, res, [cv2.IMWRITE_JPEG_QUALITY, 93, cv2.IMWRITE_JPEG_OPTIMIZE, 1, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
if debug:
    cv2.imwrite(debug + '/mask.png', rem_all * 255)
    cv2.imwrite(debug + '/gain.png', np.clip((gain - 1) * 255, 0, 255).astype(np.uint8))
