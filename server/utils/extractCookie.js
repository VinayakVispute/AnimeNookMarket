const ExtractCookie = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

module.exports = ExtractCookie;
