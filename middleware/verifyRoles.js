const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.body?.roles) {
      console.log("no roles found!");
      return res.sendStatus(401);
    }
    const rolesArray = [...allowedRoles];
    const result = req.body.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) {
      console.log("No valid roles!");
      return res.sendStatus(401);
    }
    next();
  };
};

module.exports = verifyRoles;
