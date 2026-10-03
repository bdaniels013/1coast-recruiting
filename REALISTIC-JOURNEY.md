# Realistic 3D journey

The active Canvas mounts the original camera controller and a replacement R3F world. The previous procedural planet, polygon town, cloud sprites, motes, and photo panels are not mounted. The original story, chapter scroll choreography, and Qg Jesus/people filling sequence are preserved.

The replacement uses a satellite-textured sphere with atmosphere, world-space volumetric clouds, displaced wave geometry and Fresnel water shading, a modeled coastline, gabled cottages with windows and porches, a chapel, a timber pier, and instanced trees with photographic leaf textures. Photographic textures are applied to geometry and used for environment lighting. The camera approaches the neighborhood, turns toward the water, descends, and returns to the shore.

Rebuild with `python scripts/build-realistic-journey.py`. Generated outputs have distinct v4 URLs to avoid stale script caches. Satellite maps come from the official Three.js Earth example texture assets. Siding, leaf, and sky textures were generated for this project.

Validation: JavaScript syntax, linked GLSL programs on Mesa EGL, finite desktop/mobile geometry transforms, preservation of the original people sequence, and GitHub Pages deployment checks. The review browser disables WebGL; visual browser checks cover the photographic fallback and page navigation. Full GPU journey visual review on a WebGL-capable device remains necessary.
