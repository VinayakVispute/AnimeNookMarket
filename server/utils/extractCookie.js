const ExtractCookie = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  console.log("jwt", token);
  return token;
};

module.exports = ExtractCookie;
