const GphApiClient = require('giphy-js-sdk-core');

const client = GphApiClient(process.env.GIPHY_API_KEY);

export const getRandomGiphyImageURL = () => {
  return client
    .random('gifs', {})
    .then((response: any) => response.data.images.original.gif_url)
    .catch((err: any) => console.log(err));
};

export const getRecordGiphyImageURL = (type: 'win' | 'lose') => {
  return client
    .random('gifs', { tag: type })
    .then(
      (response: any) => response.data.images.fixed_width_downsampled.gif_url
    )
    .catch((err: any) => console.log(err));
};
