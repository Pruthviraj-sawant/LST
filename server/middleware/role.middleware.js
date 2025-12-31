module.exports = (allowedRole) => {
  return (req, res, next) => {
      console.log("ROLE FROM TOKEN:", req.user.role);
    if (!req.user || req.user.role !== allowedRole) {
      return res.status(403).json({
        message: "Access denied for this role"
      });
    }
    next();
  };
};
