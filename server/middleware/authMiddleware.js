const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user to the request object
    req.user = decoded.user;

    // Call the next middleware function
    next();
  } catch (error) {
    // Catch errors thrown by jwt.verify and send appropriate response
    return res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};
