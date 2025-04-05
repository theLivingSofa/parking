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

## 🛠️ Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Frontend      | React + TailwindCSS |
| Backend       | Javascript   |
| Database      | MongoDB Atlas      |
| Deployment    | Railway & Vercel |

---

## 🧰 Requirements

- Node.js ≥ 16.x
- React ≥ 18.x
- MongoDB Atlas account
- A browser with webcam access for scanning QR codes

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/theLivingSofa/parking.git
cd parking
```

---


## ✨ Functionality

### ✅ Register Vehicle

- Endpoint: `/api/register`
- Method: `POST`
- Fields: `l_no`, `name`, `p_no`
- Auto-generates a QR code

---

### 📥 Vehicle Check-In

- Scan QR → POST to `/api/checkin`
- Updates:
  - `status: true`
  - `checkIn: <timestamp>`
  - Appends log

---

### 📤 Vehicle Check-Out

- Scan QR → POST to `/api/checkout`
- Updates:
  - `status: false`
  - `checkOut: <timestamp>`
  - Calculates fee
  - Appends log

---

### 🔍 Vehicle Status Check

- Scan QR → POST to `/api/status`
- Returns:
  - Owner name, contact
  - Status
  - Check-in/out time
  - Parking history

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

## 📦 Deployment

### Backend: [Railway](https://railway.com)


### Frontend: (Recommended) [Vercel](https://vercel.com) 

Update `VITE_BACKEND_URL` in frontend `.env` accordingly after deployment.

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
