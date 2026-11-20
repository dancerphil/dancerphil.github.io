import sys

import numpy as np
from PIL import Image

PAD = 8

src, dst = sys.argv[1], sys.argv[2]
img = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
h, w, _ = img.shape

y0, x0 = int(h * 0.8), int(w * 0.78)
ys, xs = np.nonzero(img[y0:, x0:].min(axis=2) > 150)
top, bottom = ys.min() + y0 - PAD, ys.max() + y0 + PAD
left, right = xs.min() + x0 - PAD, xs.max() + x0 + PAD

for y in range(top, bottom + 1):
    t = np.linspace(0, 1, right - left + 3)[1:-1, None]
    img[y, left:right + 1] = img[y, left - 1] * (1 - t) + img[y, right + 1] * t

Image.fromarray(img.clip(0, 255).astype(np.uint8)).save(dst)
