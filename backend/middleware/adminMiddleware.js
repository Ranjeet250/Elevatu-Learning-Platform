export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized - No user found",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized - Admin only",
    });
  }

  next();
};
