import mongoose, { Types } from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId, ref:"User", require: true},
    recevierId:{type:mongoose.Schema.Types.ObjectId, ref:"User", require: true},
    text:{type:String,},
    image:{type:String,},
    seen:{type:Boolean,default:false},
}, {timestamps: true});

const Message =  mongoose.model("Message",MessageSchema)

export default Message;