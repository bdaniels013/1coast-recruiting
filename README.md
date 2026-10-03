# ANCHOR — the photographic motion journey

Published through GitHub Pages from `main` at `/1coast-recruiting/`.

The original app, scroll camera path, procedural ocean, clouds, coastal town,
anchor drop, and seven-beat "Two sources" sequence are retained. Three generated
photographs are sampled by shader materials on subdivided meshes, with depth
textures displacing geometry into world space. The original camera travels
past these surfaces; image opacity follows the existing journey phases.
Photography is not added as HTML image cards or separate static sections.

The image environments are **2.5D**: photographs with art-directed depth fields,
not full volumetric reconstructions or measured scans. The depth meshes add
perspective and parallax while the original Three.js world provides the complete
3D surroundings. If WebGL cannot initialize, the same story remains mounted
with a photographic background fallback.

## Editing

- `assets/image-journey-component.js.txt`: readable R3F environment component,
  shader code, world placements, depth amounts, and fades.
- `assets/journey-v3.js` and `.css`: navigation, accessibility, and fallback.
- `scripts/build-depth-maps.py`: repeatable artistic depth fields.
- `scripts/build-journey.py`: guarded patch build from the original app bundle.
- `assets/images/`: optimized WebP textures and small PNG depth fields.

Run `python scripts/build-depth-maps.py` and `python scripts/build-journey.py`
after changing their sources. The original bundles remain in the repository.
The build stops if original patch points have changed.

Image prompts: a golden-hour Gulf Coast cottage neighborhood; a quiet family
moment on a coastal porch; a creative worktable with camera, laptop, and
architectural plans. These are AI-generated illustrative environments, not
photos of named real clients or a documented ANCHOR property. Generated with
the built-in image generator.
