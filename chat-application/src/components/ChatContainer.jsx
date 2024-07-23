import React, { useEffect, useState } from "react";
import { IoMdChatboxes } from "react-icons/io";
import ChatLists from "./ChatLists";
import InputText from "./InputText";
import UserLogin from "./UserLogin";
import socketIOClient from "socket.io-client";

// Create the socket connection outside of the component

const ChatContainer = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  // const socketio = socketIOClient("http://localhost:3001");
  const socketio = socketIOClient("https://chat-app-xnk1.vercel.app");
  const [chats, setChats] = useState([]);
  // console.log("chats", chats)

  useEffect(() => {
    // Set up the socket event listener only once
    socketio.on("chat", (receivedChat) => {
      setChats((prevChats) => [...prevChats, receivedChat]);
    });

    // Clean up the event listener on component unmount
    return () => {
      socketio.off("chat");
    };
  }, [socketio]);

  const sendToSocket = (chat) => {
    socketio.emit("chat", chat);
  };

  const addMessage = (chat) => {
    const newChat = {
      ...chat,
      user: localStorage.getItem("user"),
      avatar: localStorage.getItem("avatar"),
    };
    setChats((prevChats) => {
      const updatedChats = [...prevChats, newChat];
      sendToSocket(newChat);
      return updatedChats;
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('avatar');
    setUser('');
  };

  return (
    <div className="lg:px-10 md:px-8 px-4 py-5">
      {user ? (
        <div>
          <div className="flex items-center justify-between">
            <div>Username: {user}</div>
            <div className="flex items-center justify-center gap-3">
              <div>
                <IoMdChatboxes className="text-3xl" />
              </div>
              <div className="text-lg">Chat App</div>
            </div>
            <div onClick={logout} className="bg-blue-400 py-2 px-5 font-semibold text-sm border border-blue-400 rounded-md hover:bg-blue-500">
              LogOut
            </div>
          </div>
          <ChatLists chats={chats} />
          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
};

export default ChatContainer;
