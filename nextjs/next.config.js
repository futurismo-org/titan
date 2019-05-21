const withCSS = require("@zeit/next-css");

const nextConfig = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    return config;
  },
  async exportPathMap(defaultPathMap) {
    return {
      "/": { page: "/" }
    };
  },
  env: {
    ENV: "production"
  }
};

module.exports = withCSS(nextConfig);
