// import express from "express"
// import { register,checkIn,checkOut,checkStatus } from "../controllers/user.controllers.js"
// const router = express.Router()


// router.post("/register",register)
// router.post("/checkin",checkIn)
// router.post("/checkout",checkOut)
// router.post("/status",checkStatus)


// export default router

import express from "express";
import { register, checkIn, checkOut, checkStatus } from "../controllers/user.controllers.js";
import verifyToken from "../verifyToken.js";
 // Import the middleware

const router = express.Router();

// 🔒 Protected Routes
router.post("/register", verifyToken, register);
router.post("/checkin", verifyToken, checkIn);
router.post("/checkout", verifyToken, checkOut);
router.post("/status", verifyToken, checkStatus);

export default router;
