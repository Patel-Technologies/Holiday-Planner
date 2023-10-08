const jwt = require('jsonwebtoken');

// Middleware function to authenticate JWT tokens
const authenticateUser = (req, res, next) => {
  // Get the token from the request header
  // const token = req.header('Authorization');

  // // Check if a token is provided
  // if (!token) {
  //   return res.status(401).json({ message: 'Authorization token is missing' });
  // }

  // try {
  //   // Verify the token
  //   const decoded = jwt.verify(token, 'secretkey'); // Replace with your actual secret key

  //   // Attach the user ID to the request object for further use
  //   req.user = { _id: decoded.userId };
  //   next(); // Continue with the next middleware or route handler
  // } catch (error) {
  //   console.error(error);
  //   return res.status(401).json({ message: 'Invalid token' });
  // }
  next();
};

module.exports = authenticateUser;
