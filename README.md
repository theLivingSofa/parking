# 🚗 QR Code Based Parking Management System

A modern and efficient **Web-Based Parking Management System** that allows vehicle check-ins and check-outs using **QR codes**. Built using **JavaScript** for the backend, **MongoDB Atlas** for the database, and **React** for the frontend interface.

---

## 📦 Features

- 🔐 **Vehicle Registration** (License number, Owner name, Contact number)
- 📥 **QR Code-based Vehicle Check-In**
- 📤 **QR Code-based Vehicle Check-Out**
- 📊 **View Vehicle Parking Status**
- 🧾 **Parking Logs & Fee Calculation**
- 🧹 **Admin Reset Support** for clearing logs (via database)

---


## 🌐 Live Deployment
- **Frontend**: Hosted on [Vercel](https://vercel.com/)
- **Backend**: Hosted on [Railway](https://railway.app/)
- **Database**: MongoDB Atlas (Cloud)

---

## 🛠️ Tech Stack

| Frontend      | Backend   | Database      |
|---------------|-----------|---------------|
| React         | Express   | MongoDB       |
| Tailwind CSS  | Node.js   | Mongoose      |
| QR Code Lib   | Axios     | --            |

---

## 🧰 Requirements

- Node.js ≥ 16.x
- React ≥ 18.x
- MongoDB Atlas account
- A browser with webcam access for scanning QR codes

---

## ✨ Functionality

### ✅ Vehicle Registration
- Enter user details (name, phone, license number)
- Generates a unique QR code containing relevant data
- Supports **QR code download** and **thermal printing** (80mm x 80mm)

### 📤 QR Code Printing
- Print directly from the browser interface
- Optimized thermal printer support with specific formatting
- Page size: **80mm × 80mm** square layout for optimal printing

### 📲 Check-In / Check-Out / Status
- Users can scan their QR code using the webcam via the interface
- Alternatively, enter the license plate manually for status checks or operations
- Displays:
    - Owner details associated with the vehicle
    - Current status (Checked In / Checked Out / Not Registered)
    * (Optional based on implementation) Visit history (in/out times, duration, fee)

---

## 📸 QR Code Scanner

- Implemented using `react-qr-scanner`
- Optimized for mobile & desktop
- Automatically prevents duplicate scans with internal cooldown

---

## 🧼 Reset All Logs (Admin/Dev)

To clear all logs and reset check-in/check-out:

```js
db.users.updateMany({}, {
  $set: {
    logs: [],
    checkIn: null,
    checkOut: null,
    status: false
  }
});
```

Use this from **MongoDB Atlas > Browse Collections > MONGOSH**.

---


## 📌 To-Do (Future Scope)

- ✅ Admin dashboard (view logs, manage users)
- 💸 Payment gateway integration
- 🪪 License plate recognition (OCR)
- 📱 Mobile app version (React Native)

---

## 🧑‍💻 Author

**Ayush Agrawal**  
📍 Pune, India  
👨‍🎓 BCA @ MIT-WPU  
📫 [LinkedIn](https://linkedin.com/in/ayushagrawal733) | [GitHub](https://github.com/theLivingSofa)

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
