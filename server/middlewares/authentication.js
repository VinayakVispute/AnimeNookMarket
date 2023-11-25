const passport = require("passport");

function isAuthenticated(req, res, done) {
  return passport.authenticate("jwt");
}

module.exports = isAuthenticated;
