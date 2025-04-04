import express from "express"
import { register,checkIn,checkOut,checkStatus } from "../controllers/user.controllers.js"
const router = express.Router()


router.post("/register",register)
router.post("/checkin",checkIn)
router.post("/checkout",checkOut)
router.post("/status",checkStatus)


export default router