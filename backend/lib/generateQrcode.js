// import QRCode from "qrcode"


// export async function generateQrCode(name, p_no) {
//     const userData = `${name}:${p_no}`;                  // Combine name and phone
//     const qrCodeDataURL = await QRCode.toDataURL(userData); // Generate base64 QR
//     return qrCodeDataURL;                                // Return image as base64 string
// }

import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import userModel from '../models/user.model.js';

export const generateQrCode = async (userId) => {
  try {
    // Generate a unique UUID token
    const token = uuidv4();

    // Update user with the generated QR token
    const user = await userModel.findByIdAndUpdate(
      userId,
      { qrToken: token },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    // Generate QR code with the token as JSON data
    const qrData = JSON.stringify({ token });
    const qrCodeUrl = await QRCode.toDataURL(qrData);
    return qrCodeUrl;
  } catch (error) {
    console.error("Error generating QR code:", error.message);
    throw error;
  }
};




