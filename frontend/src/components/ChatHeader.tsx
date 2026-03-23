import { User } from "@/context/AppContext";
import { Menu, UserCircle } from "lucide-react";
import React from "react";

interface ChatHeaderProps {
  user: User | null;
  setSidebarOpen: (open: boolean) => void;
  isTyping: boolean;
  onlineUsers: string[];
}

const ChatHeader = ({
  user,
  setSidebarOpen,
  isTyping,
  onlineUsers,
}: ChatHeaderProps) => {
  const isOnlineUser = user && onlineUsers.includes(user._id);
  return (
    <>
  {/* mobile menu toggle */}
  <div className="sm:hidden fixed top-4 right-4 z-30">
    <button
      className="p-3 bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20 transition-all shadow-lg"
      onClick={() => setSidebarOpen(true)}
    >
      <Menu className="w-5 h-5 text-white" />
    </button>
  </div>

  {/* chat header */}
  <div className="mb-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-5 py-4 shadow-xl">
    <div className="flex items-center gap-4">
      {user ? (
        <>
          {/* avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-md">
              <UserCircle className="w-7 h-7 text-gray-300" />
            </div>

            {/* online indicator */}
            {isOnlineUser && (
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-black">
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
              </span>
            )}
          </div>

          {/* user info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-white truncate">
              {user.name}
            </h2>

            {/* status */}
            {isTyping ? (
              <div className="flex items-center gap-2 text-sm mt-1">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></span>
                </div>
                <span className="text-blue-400">typing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOnlineUser ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                <span
                  className={`text-sm ${
                    isOnlineUser ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  {isOnlineUser ? "Online" : "Offline"}
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
            <UserCircle className="w-7 h-7 text-gray-300" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">
              Select a chat
            </h2>
            <p className="text-xs text-gray-500">
              Start a conversation 🚀
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
</>
  );
};

export default ChatHeader;
