# ANCHOR 3D journey — waterfront community

The v6 environment keeps the original Earth opening, scroll choreography, story and Jesus/people-filling sequence. The people sequence is verified byte for byte against the original.

The new connected mainland holds a waterfront main street, residential verandas, community square and chapel, cornices, parapets, balconies, recessed rooflines, modeled window trim, standing-seam cottage roofs, streets, sidewalks, benches, lights and a timber pier. Instanced geometry shares materials and meshes. Photographic brick, stucco, wood, sand, pavement and asphalt textures cover the modeled surfaces. A generated orthographic four-quadrant facade atlas supplies shopfronts and sash windows on the actual building geometry. Upper floors and shopfronts use separate atlas regions; repeated panels preserve human-scale window proportions. Palms have tapered trunks and curved three-dimensional fronds with individual leaflets.

Sea level is fixed at zero. Mainland foundations are at 2.8m; the largest modeled wave excursion is 0.33m. All later camera positions stay above water and land, with at least 3.2m clearance across 12,012 interpolated samples. The old underwater descent and disconnected island scene have been replaced. The ocean shoreline foam now follows the same straight mainland waterfront. The camera moves from Earth to arrival, across the promenade and community, then to the pier and shore. Existing motion-reduction behavior remains.

Rebuild: `python scripts/build-realistic-journey.py`.
Validation: `python scripts/validate-coastal-journey.py`; ECMAScript parsing of generated modules; approximate Mesa EGL geometry previews at four camera positions. Desktop has 7,715 modeled details, mobile 3,329, distributed across shared instanced meshes. Mobile uses a lower pixel ratio and smaller shadow map. District textures are compressed for transfer.

Browser limitation: the cloud browser shows the graphics-unavailable fallback, so full browser GPU appearance cannot be certified here. The EGL previews use approximate materials and are not screenshots of the finished browser shader pipeline. Live navigation and GitHub Pages deployment are checked separately.

Credits: Poly Haven CC0 surface textures, Coast Rocks 01 and Qwantani Sunset Pure Sky HDR; official Three.js Earth and water-normal textures. Facade atlas created with the built-in image generator. Prompt: a photorealistic, orthographic four-quadrant building facade albedo atlas; cream stucco and weathered red-brick shopfronts above matching sash-window upper floors; neutral lighting, no signs, people, logos, cars, sky or perspective distortion.
