import { generateQrCode } from "../lib/generateQrcode.js"
import { decodeQRCode } from "../lib/decodeQrcode.js"
import userModel from "../models/user.model.js"

export const register = async (req, res) => {
    try {
        const { name, p_no, l_no } = req.body
        if (!name) {
            res.status(400).json({ message: "name is required" })
        }
        if (!p_no) {
            res.status(400).json({ message: "p_no is required" })
        }
        if (!l_no) {
            res.status(400).json({ message: "l_no is required" })
        }

        const userExits = await userModel.findOne({p_no : p_no})

        if(userExits){
            return res.status(400).json({message : "user already exits"})
        }

        let url = await generateQrCode(name, p_no)

        const user = await userModel.create({
            name,
            p_no,
            l_no,
            status: false,
            qrcodeUrl: url,
        })

        return res.status(200).json({
            user: {
                name: user.name,
                p_no: user.p_no,
                l_no: user.l_no,
                status: false,
                qrcodeUrl: user.qrcodeUrl,
            }, message: "user is created"
        })

    } catch (error) {
        console.log("Error while creating user", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

export const checkIn = async (req, res) => {
    try {
        const { qrcodeUrl } = req.body

        if (!qrcodeUrl) {
            return res.status(400).json({ message: "url is required" })
        }

        const userData = await decodeQRCode(qrcodeUrl)

        const user = await userModel.findOne({ p_no: userData.p_no })

        if (!user) {
            return res.status(400).json({ message: "user is not found" })
        }

        user.status = true,
            user.checkIn = new Date()

        await user.save()

        return res.status(200).json({ message: "User is check-in" })

    } catch (error) {
        console.log("error while check-in", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


export const checkOut = async (req, res) => {
    try {
        const { qrcodeUrl } = req.body

        if (!qrcodeUrl) {
            return res.status(400).json({ message: "url is required" })
        }

        const userData = await decodeQRCode(qrcodeUrl)


        const user = await userModel.findOne({ p_no: userData.p_no })

        if (!user) {
            return res.status(400).json({ message: "user is not found" })
        }

        user.status = false,
            user.checkOut = new Date()

        let rate;
        const diffInMs = user.checkOut - user.checkIn; // Milliseconds
        const hrs = diffInMs / (1000 * 60 * 60); // Convert to hours

        if (hrs > 0) {
            rate = 20 * hrs;
        }

        console.log("rate", rate)
        await user.save()
        return res.status(200).json({ message: "User is check-out", rate: rate })

    } catch (error) {
        console.log("error while check-in", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


export const checkStatus = async (req, res) => {
    try {
        const { qrcodeUrl } = req.body

        if (!qrcodeUrl) {
            return res.status(400).json({ message: "url is required" })
        }

        const userData = await decodeQRCode(qrcodeUrl)
        console.log("userdata", userData)

        const user = await userModel.findOne({ p_no: userData.p_no })

        if (!user) {
            return res.status(400).json({ message: "user is not found" })
        }

        res.status(200).json({ status: user })
    } catch (error) {
        console.log("error while checking status", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
