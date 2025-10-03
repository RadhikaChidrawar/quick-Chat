import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";
import ChatContainer from "../components/ChatContainer";

function HomePage() {
  const [selectedUser, setSelectedUser] = useState(false);

  return (
    <div className="flex items-center justify-center w-full h-screen text-white">
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden w-full max-w-[1200px] h-[80%] grid grid-cols-1 relative
          ${selectedUser 
            ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' 
            : 'md:grid-cols-2'}`}
      >
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
    </div>
  );
}

export default HomePage;
