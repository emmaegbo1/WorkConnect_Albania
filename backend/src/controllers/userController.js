export const me = async (req, res) => {
  res.json({ user: { id: req.user.id, email: req.user.email, roles: req.user.roles } });
};

export const logout = async (req, res) => {
  res.clearCookie('refreshToken', { path: '/' });
  res.json({ message: 'Logged out' });
};