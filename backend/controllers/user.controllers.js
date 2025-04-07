import { generateQrCode } from "../lib/generateQrcode.js";
import { decodeQRCode } from "../lib/decodeQrcode.js";
import userModel from "../models/user.model.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { name, p_no, l_no } = req.body;

    if (!name || !p_no || !l_no) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const licenseRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    if (!licenseRegex.test(l_no)) {
      return res.status(400).json({ message: "License plate must be in format AB12AB1234" });
    }

    const userExists = await userModel.findOne({ l_no });

    if (userExists) {
      return res.status(400).json({ message: "License plate already exists" });
    }

    const url = await generateQrCode(name, p_no, l_no);

    const user = await userModel.create({
      name,
      p_no,
      l_no,
      status: false,
      qrcodeUrl: url,
    });

    return res.status(200).json({
      user: {
        name: user.name,
        p_no: user.p_no,
        l_no: user.l_no,
        status: user.status,
        qrcodeUrl: user.qrcodeUrl,
      },
      message: "User is created",
    });
  } catch (error) {
    console.log("Error while creating user", error.message);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Check-in a user
export const checkIn = async (req, res) => {
  try {
    const { qrcodeUrl } = req.body;

    if (!qrcodeUrl) {
      return res.status(400).json({ message: "QR code URL is required" });
    }

    const userData = await decodeQRCode(qrcodeUrl);
    const user = await userModel.findOne({ l_no: userData.l_no });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status && user.checkIn) {
      return res.status(400).json({ message: "User is already checked in" });
    }

    user.status = true;
    user.checkIn = new Date();
    await user.save();

    return res.status(200).json({ message: "User has successfully checked in" });
  } catch (error) {
    console.error("Error during check-in:", error.message);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Check-out a user and calculate fee
// export const checkOut = async (req, res) => {
//   try {
//     const { qrcodeUrl } = req.body;

//     if (!qrcodeUrl) {
//       return res.status(400).json({ message: "QR code URL is required" });
//     }

//     const userData = await decodeQRCode(qrcodeUrl);
//     const user = await userModel.findOne({ l_no: userData.l_no });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!user.checkIn) {
//       return res.status(400).json({ message: "No check-in record found" });
//     }

//     const checkOutTime = new Date();
//     const checkInTime = user.checkIn;
//     const diffInMs = checkOutTime - checkInTime;
//     const durationHours = diffInMs / (1000 * 60 * 60);
//     const roundedHours = Math.ceil(durationHours); // Round up to nearest hour
//     const rate = Math.max(20, Math.round(roundedHours * 20)); // ₹20/hour, minimum ₹20

//     user.logs.push({
//       checkIn: checkInTime,
//       checkOut: checkOutTime,
//       duration: roundedHours,
//     });

//     user.status = false;
//     user.checkOut = checkOutTime;
//     user.checkIn = null;

//     await user.save();

//     return res.status(200).json({
//       message: "User has successfully checked out",
//       rate: rate,
//     });
//   } catch (error) {
//     console.log("Error during check-out", error.message);
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

export const checkOut = async (req, res) => {
    try {
        const { qrcodeUrl } = req.body;

        if (!qrcodeUrl) {
            return res.status(400).json({ message: "QR code URL is required" });
        }

        const userData = await decodeQRCode(qrcodeUrl);
        const user = await userModel.findOne({ l_no: userData.l_no });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.checkIn) {
            return res.status(400).json({ message: "No check-in record found" });
        }

        const checkOutTime = new Date();
        const checkInTime = user.checkIn;
        const durationMs = checkOutTime - checkInTime;
        const durationHours = durationMs / (1000 * 60 * 60);
        const roundedHours = Math.ceil(durationHours);
        const amountCharged = Math.max(20, Math.round(roundedHours * 20));

        // Push this session to logs with billing info
        user.logs.push({
            checkIn: checkInTime,
            checkOut: checkOutTime,
            duration: roundedHours,
            amount: amountCharged,
        });

        // Update user status
        user.status = false;
        user.checkOut = checkOutTime;
        user.checkIn = null;

        await user.save();

        return res.status(200).json({
            message: "User has successfully checked out",
            rate: amountCharged,
        });

    } catch (error) {
        console.log("Error during check-out:", error.message);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// Check current status of a user
// Check current status of a user
// export const checkStatus = async (req, res) => {
//     try {
//       const { qrcodeUrl, l_no } = req.body;
  
//       let user;
  
//       // Prioritize QR Code if provided
//       if (qrcodeUrl) {
//         const userData = await decodeQRCode(qrcodeUrl);
//         user = await userModel.findOne({ l_no: userData.l_no });
//       } 
//       // Fallback to manual license number
//       else if (l_no) {
//         user = await userModel.findOne({ l_no });
//       } 
//       // Neither provided
//       else {
//         return res.status(400).json({ message: "Either QR code or License number is required" });
//       }
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       return res.status(200).json({
//         name: user.name,
//         license_plate: user.l_no,
//         phone: user.p_no,
//         isParked: user.status,
//         currentCheckIn: user.checkIn || null,
//         logs: user.logs.map(log => ({
//           checkIn: log.checkIn,
//           checkOut: log.checkOut,
//           duration: log.duration,
//           amount: log.amount, 
//         })) || [],
//       });
      
//     } catch (error) {
//       console.log("Error while checking status", error.message);
//       return res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
//   };
  
export const checkStatus = async (req, res) => {
  try {
    const { qrcodeUrl, l_no, startDate, endDate } = req.body;
    let user;

    // Step 1: Find user by QR or License Plate
    if (qrcodeUrl) {
      const userData = await decodeQRCode(qrcodeUrl);
      user = await userModel.findOne({ l_no: userData.l_no });
    } else if (l_no) {
      user = await userModel.findOne({ l_no });
    } else {
      return res.status(400).json({ message: "Either QR code or License number is required" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let logs = user.logs || [];

    // Step 2: Sort logs by newest first
    logs.sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime());

    // Step 3: Apply date range filter (if provided)
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include entire end date

      logs = logs.filter(log => {
        const checkIn = new Date(log.checkIn).getTime();
        return checkIn >= start.getTime() && checkIn <= end.getTime();
      });
    } else {
      // Step 4: If no range, show only the latest log
      logs = logs.length > 0 ? [logs[0]] : [];
    }

    // Step 5: Send response
    return res.status(200).json({
      name: user.name,
      license_plate: user.l_no,
      phone: user.p_no,
      isParked: user.status,
      currentCheckIn: user.checkIn || null,
      logs: logs.map(log => ({
        checkIn: log.checkIn,
        checkOut: log.checkOut,
        duration: log.duration,
        amount: log.amount,
      }))
    });

  } catch (error) {
    console.error("Error while checking status:", error.message);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

