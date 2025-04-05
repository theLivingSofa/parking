// // verifyToken.js
// import admin from './firebaseAdmin.js';

// const allowedEmails = [
//   "ayushagrawal10242@gmail.com",
//   "ayushagrawal733@gmail.com",
  
// ];

// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split('Bearer ')[1];

//   if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

//   try {
//     const decoded = await admin.auth().verifyIdToken(token);

//     if (!allowedEmails.includes(decoded.email)) {
//       return res.status(403).json({ message: 'Forbidden: Email not authorized' });
//     }

//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid or expired token', error: err.message });
//   }
// };

// export default verifyToken;
// verifyToken.js
import admin from './firebaseAdmin.js';

// ✅ List of allowed email addresses
const allowedEmails = [
  "ayushagrawal10242@gmail.com",
  "ayushagrawal733@gmail.com",
];

// ✅ Middleware function to verify Firebase ID Token
const verifyToken = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];

    // ✅ Verify the token using Firebase Admin SDK
    const decoded = await admin.auth().verifyIdToken(token);

    // ✅ Debugging (optional): Log email being verified
    console.log("Decoded email:", decoded.email);

    // ✅ Ensure email exists and is in allowed list
    if (!decoded.email || !allowedEmails.includes(decoded.email)) {
      return res.status(403).json({ message: 'Forbidden: Email not authorized' });
    }

    // ✅ Attach user info to request
    req.user = decoded;
    next();

  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: 'Invalid or expired token', error: err.message });
  }
};

export default verifyToken;
