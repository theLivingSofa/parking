// export async function decodeQRCode(qrData) {
//     console.log("gr : ",qrData)
//     try {
//         // Check if the QR data is already a JSON string
//         const userData = JSON.parse(qrData);
//         return userData;
//     } catch (error) {
//         throw new Error("Invalid QR Code data");
//     }
// }
// lib/generateQrcode.js

import Jimp from "jimp";
import QrCode from "qrcode-reader";

/**
 * Decodes a QR code from a base64 Data URL and extracts the UUID token.
 * @param {string} qrDataUrl - Base64-encoded QR code string (data:image/png;base64,...)
 * @returns {Promise<{ token: string }>} - Decoded token from the QR code.
 */
export const decodeQRCode = async (qrDataUrl) => {
  try {
    // Strip the Data URL header (e.g., data:image/png;base64,...) to get raw base64
    const base64Data = qrDataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const image = await Jimp.read(buffer);
    const qr = new QrCode();

    return new Promise((resolve, reject) => {
      qr.callback = (err, value) => {
        if (err) {
          return reject("Failed to decode QR code: " + err.message);
        }

        try {
          const decoded = JSON.parse(value.result);
          if (!decoded.token) {
            return reject("QR code does not contain a valid token");
          }
          resolve({ token: decoded.token });
        } catch (parseError) {
          reject("Failed to parse QR data: " + parseError.message);
        }
      };

      qr.decode(image.bitmap);
    });
  } catch (error) {
    throw new Error("Error decoding QR code: " + error.message);
  }
};


  