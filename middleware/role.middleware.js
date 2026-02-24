const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Role check failed"
      });
    }
  };
};

export default allowRoles;