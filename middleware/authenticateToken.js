import BlacklistToken from "../models/BlacklistTokenModel";

export const authenticateToken =async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const blacklistedToken = await BlacklistToken.findOne({ token });
      if (blacklistedToken) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  