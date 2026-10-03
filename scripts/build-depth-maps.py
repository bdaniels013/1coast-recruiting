"""Art-directed depth fields for the three photographs (not measured geometry).

The sky / distant scenery remains behind the roofs, people and worktable.
The resulting depth textures displace subdivided meshes inside the original
Three.js camera scene. These are 2.5D photographic environments, not scanned
or independently navigable reconstructions of actual places or people.
"""
from pathlib import Path
import numpy as np
from PIL import Image

root = Path(__file__).resolve().parents[1] / 'assets/images'
width, height = 512, 320
x, y = np.meshgrid(np.linspace(0, 1, width), np.linspace(0, 1, height))

def smooth(a, b, value):
    t = np.clip((value-a)/(b-a), 0, 1)
    return t*t*(3-2*t)

def bump(cx, cy, rx, ry):
    return np.exp(-(((x-cx)/rx)**2 + ((y-cy)/ry)**2)*2)

fields = {
    'coastal-arrival': .08 + .78*smooth(.28, 1, y)
        + .10*bump(.12, .76, .25, .25) - .17*bump(.85, .42, .33, .16),
    'family-at-home': .12 + .46*smooth(.15, 1, y)
        + .27*bump(.055, .47, .105, .70)
        + .29*bump(.72, .58, .19, .26)
        + .15*bump(.84, .40, .11, .20),
    'purposeful-work': .10 + .77*smooth(.38, 1, y)
        + .25*bump(.21, .55, .17, .14)
        + .12*bump(.43, .57, .23, .10),
}
for name, field in fields.items():
    depth = np.clip(field, 0, 1)
    Image.fromarray((depth*255).astype('uint8')).save(root/f'{name}-depth.png')
    print(name, 'depth range:', round(float(depth.min()), 2), round(float(depth.max()), 2))
