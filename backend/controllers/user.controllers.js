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

        const userExits = await userModel.findOne({l_no : l_no})

        if(userExits){
            return res.status(400).json({message : "License plate already exits"})
        }

        let url = await generateQrCode(name, p_no, l_no)

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

        const user = await userModel.findOne({ l_no: userData.l_no })

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
        const { qrcodeUrl } = req.body;

        if (!qrcodeUrl) {
            return res.status(400).json({ message: "url is required" });
        }

        const userData = await decodeQRCode(qrcodeUrl);
        const user = await userModel.findOne({ l_no: userData.l_no });

        if (!user) {
            return res.status(400).json({ message: "user is not found" });
        }

        if (!user.checkIn) {
            return res.status(400).json({ message: "No check-in record found" });
        }

        const checkOutTime = new Date();
        const checkInTime = user.checkIn;
        const diffInMs = checkOutTime - checkInTime;
        const hrs = diffInMs / (1000 * 60 * 60);
        const rate = 20 * hrs;

        // Push this session to logs
        user.logs.push({
            checkIn: checkInTime,
            checkOut: checkOutTime,
            duration: hrs,
        });

        // Update user status
        user.status = false;
        user.checkOut = checkOutTime;
        user.checkIn = null; // Clear the checkIn timestamp for future reuse

        await user.save();

        return res.status(200).json({
            message: "User is check-out",
            rate: rate,
        });

    } catch (error) {
        console.log("error while check-out", error.message);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



export const checkStatus = async (req, res) => {
    try {
        const { qrcodeUrl } = req.body;

        if (!qrcodeUrl) {
            return res.status(400).json({ message: "url is required" });
        }

        const userData = await decodeQRCode(qrcodeUrl);
        const user = await userModel.findOne({ l_no: userData.l_no });

        if (!user) {
            return res.status(400).json({ message: "user is not found" });
        }

        return res.status(200).json({
            name: user.name,
            license_plate: user.l_no,
            phone: user.p_no,
            isParked: user.status,
            currentCheckIn: user.checkIn || null,
            logs: user.logs || []
        });

    } catch (error) {
        console.log("error while checking status", error.message);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

