const sanitizeUser = (user) => {
  const { role, id } = user;
  return { role, id };
};

module.exports = sanitizeUser;
