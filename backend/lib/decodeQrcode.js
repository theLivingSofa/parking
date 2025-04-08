export async function decodeQRCode(qrData) {
    console.log("gr : ",qrData)
    try {
        // Check if the QR data is already a JSON string
        const userData = JSON.parse(qrData);
        return userData;
    } catch (error) {
        throw new Error("Invalid QR Code data");
    }
}