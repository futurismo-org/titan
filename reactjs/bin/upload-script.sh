version=$(git rev-parse HEAD)
for filename in ./sourceMaps/*; do
  sliced=${filename//.\/sourceMaps/""}
  without_map=${sliced//.map/""}
  minified_url=https://titan-fire.com/static/js$without_map
  source_map=@${filename//.\//""}

  curl https://api.rollbar.com/api/1/sourcemap \
  -F access_token=6e15d054ad6b4bd4ae8e68da0bd39c55 \
  -F version="$version" \
  -F minified_url=$minified_url \
  -F source_map="$source_map"
done