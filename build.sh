#!/bin/sh
# Rebuilds the deployable bundle from src/. Run from the repo root: sh build.sh
set -e
npx --yes esbuild@0.24.0 src/app.js --minify --format=esm --target=es2020 --outfile=assets/index-v3.js --log-level=warning
cat assets/index-Dux6yvmq.css src/extra.css > assets/index-v3.css
