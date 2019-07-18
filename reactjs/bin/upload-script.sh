#!/bin/sh
version=$(git rev-parse HEAD)
for filename in ./sourceMaps/*; do
  without_map=`basename $filename .map`
  minified_url=https://titan-fire.com/static/js/$without_map
  source_map=@sourceMaps/`basename $filename`

  curl https://api.rollbar.com/api/1/sourcemap \
  -F access_token=7647d09a575c44beae1f7721366c51fe \
  -F version=$version \
  -F minified_url=$minified_url \
  -F source_map=$source_map
done
