# ANCHOR 3D journey

The v5 scene uses the original scroll camera controller, story, and unchanged Qg Jesus/people filling sequence. The previous procedural world, box cottages, oversized leaf cards, and inserted photo panels are not mounted.

The coast uses Poly Haven's full Coast Rocks 01 photogrammetry mesh (679,936 triangles), original UV coordinates, a 4K photographic color texture, and normal/roughness maps. Position/normal/UV quantization preserves the mesh topology while reducing transfer size. Shared geometry creates the surrounding shoreline and an underwater rock face. The ocean has displaced wave geometry, real water normals, Fresnel reflections of the photographic sky, and restrained shore foam. Photographed HDR radiance illuminates the materials through PMREM. The existing textured Earth and descent clouds carry the opening.

Rebuild the app with `python scripts/build-realistic-journey.py`. The scenery manifest and binary fragments in `assets/natural-pack` reconstruct the geometry package; these are runtime assets and must be deployed together. Licensed color, normal, roughness and HDR source images load from Poly Haven, and the water normal map loads from Three.js. The existing v4 library supplies the renderer through a small v5 re-export module. Versioned v5 modules avoid reusing the earlier scene scripts.

Credits: Coast Rocks 01 and Qwantani Sunset Pure Sky by [Poly Haven](https://polyhaven.com), CC0. Asset acquisition powered by Poly Haven. Earth maps and water normal map from the official Three.js example assets.

Checks: ECMAScript module parsing, linked GLSL on Mesa EGL, binary fragment integrity, valid mesh indices, material texture references, finite HDR samples, unchanged people sequence, and offscreen geometry previews at orbit/coast/deep/shore camera positions. The offscreen previews use an approximate material renderer; they do not establish browser visual parity. The cloud review browser disables WebGL, so live browser checks cover loading, fallback presentation, and navigation. Full browser GPU visual review remains unverified.
