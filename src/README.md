# OIKOS source

The original source project was not in this repo, so `app.js` was recovered from the
compiled bundle (formatted, with the new work written in readable form on top).

- `app.js`: the whole app. React and the page are bundled inside it; three.js and GSAP
  load from `assets/three-v2.js` and `assets/gsap-FcKYx0yc.js`.
- `extra.css`: styles added on top of the original `assets/index-Dux6yvmq.css`.
- Rebuild with `sh build.sh` from the repo root. It writes `assets/index-v2.js` and
  `assets/index-v2.css`, which `index.html` loads.

Added in this pass: spline camera with banking (`camPath`), the 3D anchor and chain
(`Anchor`), the bloom lens pass (`Lens`), swell and sky reflection on the sea, light
shafts in the deep, self-hosted Earth maps in `assets/earth/` (old hosts kept as
fallback), and the light pass on gold words.

Debug switches: add `?off=lens`, `?off=anchor`, `?off=clouds` or `?off=motes` to the URL.
