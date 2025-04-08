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

import Jimp from 'jimp';
import jsQR from 'jsqr';

export const decodeQRCode = async (base64Image) => {
  try {
    const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const image = await Jimp.read(buffer);
    const { data, width, height } = image.bitmap;

    const code = jsQR(new Uint8ClampedArray(data), width, height);

    if (!code) {
      throw new Error("QR code could not be read");
    }

    const parsed = JSON.parse(code.data);
    if (!parsed.token) {
      throw new Error("Invalid QR Code Data");
    }

    return { token: parsed.token };
  } catch (error) {
    console.error("Error decoding QR code:", error.message);
    throw error;
  }
};
