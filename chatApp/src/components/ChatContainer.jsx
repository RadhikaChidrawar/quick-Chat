import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

function ChatContainer({ selectedUser, setSelectedUser }) {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return selectedUser ? (
    <div className="h-full overflow-auto relative backdrop-blur-lg bg-gray-900/50">

      {/* ------------------------------Header--------------------------- */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-gray-600 bg-gray-800/50">
        <img src={assets.profile_martin} alt="" className="w-8 h-8 rounded-full object-cover" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          Radhika Chidrawar
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden w-7 h-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden w-5 h-5 cursor-pointer" />
      </div>

      {/* --------------------------chat area--------------------------- */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-auto p-3 pb-6">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              msg.senderId !== "680f5116f10f3cd28382ed02" && "flex-row-reverse"
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt=""
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-2"
              />
            ) : (
              <p
                className={`p-3 max-w-[200px] text-sm font-light rounded-lg mb-2 break-words ${
                  msg.senderId === "680f5116f10f3cd28382ed02" 
                    ? "bg-violet-600 text-white rounded-br-none" 
                    : "bg-gray-700 text-white rounded-bl-none"
                }`}
              >
                {msg.text}
              </p>
            )}
            <div className="text-center text-sm">
              <img 
                src={
                  msg.senderId === "680f5116f10f3cd28382ed02" 
                    ? assets.avatar_icon 
                    : assets.profile_martin
                } 
                alt="" 
                className="w-7 h-7 rounded-full object-cover" 
              />
              <p className="text-gray-500 text-xs mt-1">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* ------------------------------bottom Area-------------------------- */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-gray-800/50 border-t border-gray-600">
        <div className="flex-1 flex items-center bg-gray-700/50 px-3 rounded-full border border-gray-600">
          <input 
            type="text" 
            placeholder="Send a message" 
            className="flex-1 text-sm p-3 bg-transparent border-none rounded-lg outline-none text-white placeholder-gray-400 w-full"
          />
          <input type="file" id="image" accept="image/png, image/jpeg" hidden/>
          <label htmlFor="image" className="cursor-pointer">
            <img src={assets.gallery_icon} alt="" className="w-5 h-5 mr-2" />
          </label>
        </div>
        <img src={assets.send_button} alt="" className="w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity"/>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 text-gray-400 bg-gray-900/50 h-full max-md:hidden">
      <img src={assets.logo_icon} alt="" className="w-16 h-16" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
}

export default ChatContainer;