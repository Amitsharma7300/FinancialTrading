const role = (requiredRole) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'No user' });
  if (req.user.role !== requiredRole) return res.status(403).json({ message: 'Forbidden' });
  next();
};

module.exports = role;
