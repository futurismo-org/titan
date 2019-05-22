const withCSS = require("@zeit/next-css");
const processContent = require("next-graphql-static-export");
const { typeParams } = require("./config-export");

const nextConfig = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    return config;
  },
  async exportPathMap() {
    if (process.env.NODE_ENV !== "production") return {};

    // Create our static export data
    // const [challenges] = await processContent(typeParams);

    // Create the static pages with Next
    return {
      "/": { page: "/" },
      "/challenges": { page: "/challenges" }
      // ...challenges
    };
  },
  env: {
    ENV: "production"
  }
};

module.exports = withCSS(nextConfig);
