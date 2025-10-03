import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";


// get all users except the logged in user 
export const getUsersForSidebar = async(req, res)=>{
    try{
        const userId = req.user._id;
        const filteredUser = await User.find({_id: {$ne: userId}}).select("-password")

        // count num of seen message
        const unseenMessages ={}
        const promise = filteredUser.map(async(user)=>{
            const message = await Message.find({senderId: user._id, recevierId: userId , seen:false})
            if(message.length > 0 ){
                unseenMessages[user._id]= message.length;
            }
        }) 
        await promise.all(promise);
        res.json({success: true, users:filteredUser, unseenMessages })
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message })
    }
}


// get all message for selected user
export const getMessage = async (req, res)=>{
    try{
        const {id: selectedUserId} = req.params;
        const myId = req.users._id
        const mesage= await Message.find({
            $or:[
                {senderId: myId, recevierId:selectedUserId},
                {senderId: selectedUserId, recevierId: myId},
            ]
        }) 
        await Message.updateMany({senderId: selectedUserId, recevierId: myId},
        {seen: true});

        res.json({success: true, message})

    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message })
    }
}


// api to mark message as seen using message id

export const markMessageAsSeen = async (req, res)=>{
    try{

        const { id } = req.params;
        await Message.findByIdAndUpdate(id, {seen : true})
        res.json({success: true})

    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message })
    }
}

// send message to selected user

export const sendMessage = async(req, res)=>{
    try{
        const {text, image}= req.bosy;
        const recevierId = req.params.id;
        const senderId = req.params._id;

        let imagUrl;
        if(image){
            const uploderResponse = await cloudinary.uploader.upload(image)
            imagUrl = uploderResponse.secure_url;

        }

        const newMessage = await Message.create({
            senderId,
            recevierId,
            text,
            imagUrl
        })

        // Emit the new mesage to the recevier's socket
        const receiverSocketId = userSocketMap[recevierId];
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.json({success: true, newMessage})

    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message })
    }
}
