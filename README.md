# 🚗 QR Code Based Parking Management System

A modern and efficient **Web-Based Parking Management System** that allows vehicle check-ins and check-outs using **QR codes**. Built using **FastAPI** (Python) for the backend, **MongoDB Atlas** for the database, and **React** for the frontend interface.

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
| Backend       | FastAPI (Python)   |
| Database      | MongoDB Atlas      |
| Deployment    | Fly.io (FastAPI backend) |

---

## 🧰 Requirements

- Node.js ≥ 16.x
- Python ≥ 3.9
- MongoDB Atlas account
- Fly.io account
- A browser with webcam access for scanning QR codes

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/qr-parking-management.git
cd qr-parking-management
```

---

### 2. Backend Setup (FastAPI)

#### ➤ Create and activate a virtual environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
```

#### ➤ Install dependencies

```bash
pip install -r requirements.txt
```

#### ➤ Environment variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourDB?retryWrites=true&w=majority
```

#### ➤ Run the server

```bash
uvicorn main:app --reload
```

---

### 3. Frontend Setup (React)

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_BACKEND_URL=http://localhost:8000
```

Then run the app:

```bash
npm run dev
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

### Backend: [Fly.io](https://fly.io)

```bash
flyctl launch
flyctl deploy
```

### Frontend: (Recommended) [Vercel](https://vercel.com) or [Netlify](https://netlify.com)

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
📫 [LinkedIn](https://linkedin.com/in/your-profile) | [GitHub](https://github.com/your-username)

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.