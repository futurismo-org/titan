module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['babel-plugin-styled-components'],
    resolvers: {
      sourceExts: [
        'jsx',
        'js',
        'json',
        'ts',
        'tsx'
      ],
    }  
  };
};


