import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number, // in hours
        required: true,
    },
    amount: {
        type: Number, // 💸 Add this line
        required: true,
    },
}, { _id: false }); // Prevents automatic creation of _id in logs array

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    l_no: {
        type: String,
        required: true,
        unique: true,
    },
    p_no: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    qrcodeUrl: {
        type: String,
    },
    balanceLeft: {
        type: Number,
        default: 0
    },
    checkIn: {
        type: Date
    },
    checkOut: {
        type: Date
    },
    logs: [logSchema] // Array of log objects
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

export default userModel;
