const env = process.env.NODE_ENV || "development";

const configs = {
  development: {
    api: "http://localhost:5000/titan-dev-1234/asia-northeast1/api"
  },
  staging: {
    api: "https://asia-northeast1-titan-dev-1234.cloudfunctions.net/api"
  },
  production: {
    api: "https://asia-northeast1-titan-dev-1234.cloudfunctions.net/api"
  }
}[env];

module.exports = {
  configs
};
