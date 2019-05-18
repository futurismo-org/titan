const env = process.env.NODE_ENV || "development";

const configs = {
  development: {
    api: "http://localhost:5000"
  },
  staging: {
    api: "https://asia-northeast1-titan-dev-1234.cloudfunctions.net/api"
  },
  production: {
    api: "https://asia-northeast1-titan-dev-1234.cloudfunctions.net/api"
  }
}[env];

export default configs;
