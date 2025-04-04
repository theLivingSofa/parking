import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    l_no : {
        type : String,
        required : true,
    },
    p_no : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
    },
    qrcodeUrl : {
        type : String,
    },
    balanceLeft : {
        type : Number
    },
    checkIn : {
        type : Date
    },
    checkOut : {
        type : Date
    }
},{timestamps : true})


const userModel =  mongoose.model('user',userSchema)

export default userModel