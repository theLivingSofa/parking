// import QRCode from "qrcode"


// export async function generateQrCode(name, p_no) {
//     const userData = `${name}:${p_no}`;                  // Combine name and phone
//     const qrCodeDataURL = await QRCode.toDataURL(userData); // Generate base64 QR
//     return qrCodeDataURL;                                // Return image as base64 string
// }


import QRCode from 'qrcode';

export const generateQrCode = async (name, p_no) => {
  const data = JSON.stringify({ name, p_no }); // Convert object to a string
  return await QRCode.toDataURL(data); // Generate a Base64 QR code
};


