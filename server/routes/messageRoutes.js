import express from 'express';
import { protectRoute } from '../middleware/auth';
import { getMessage, getUsersForSidebar, markMessageAsSeen, sendMessage } from '../controllers/messagesControllers';

const messageRouter = express.Router();

messageRouter.get("/user", protectRoute, getUsersForSidebar)
messageRouter.get("/:id", protectRoute,  getMessage)
messageRouter.put("mark/:id", protectRoute,  markMessageAsSeen)
messageRouter.post("/send/:id",protectRoute,sendMessage)


export default messageRouter;