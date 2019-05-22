const routes = require("next-routes")();

routes
  .add("home", "/", "index")
  .add("signin", "/signin", "signin")
  .add("challenges", "/challenges")
  .add("challenge", "/c/:id", "challenge");

module.exports = routes;
