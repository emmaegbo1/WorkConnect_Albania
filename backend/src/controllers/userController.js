// controllers/userController.js

// ✅ Get current user profile
export const me = async (req, res, next) => {
  try {
    if (!req.user) {
      const error = new Error("User not authenticated");
      error.statusCode = 401;
      return next(error);
    }

    res.json({
      success: true,
      message: "User profile fetched successfully",
      data: {
        id: req.user.id,
        email: req.user.email,
        roles: req.user.roles,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Logout user
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", { path: "/" });
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};