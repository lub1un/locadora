function checkRole(role) {
    return (req, res, next) => {
      if (req.user.permission_type !== role) {
        return res.status(403).send('Acesso negado.');
      }
      next();
    };
  }
  
  module.exports = checkRole;
  