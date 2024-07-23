import React from "react";

const ChatLists = ({ chats }) => {
  const user = localStorage.getItem("user");

  function SenderChat({ message, username, avatar }) {
    return (
      <div className="flex items-center gap-2">
        <img className="rounded-full w-10 h-10" src={avatar} alt="" />
        <div className="bg-slate-200 p-2 rounded-md">
          <p className="text-xs font-semibold">{username}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    );
  }
  function ReceiverChat({ message, username, avatar }) {
    return (
      <div className="flex justify-end items-center gap-2">
        <img className="rounded-full w-10 h-10 order-2" src={avatar} alt="" />
        <div className="order-1 text-right bg-slate-200 p-2 rounded-md">
          <p className="text-xs font-semibold">{username}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 lg:px-10 md:px-8 px-4">
      {chats.map((chat, index) => {
        if (chat.user === user) {
            return (
                <ReceiverChat
                  key={index}
                  message={chat.message}
                  username={chat.user}
                  avatar={chat.avatar}
                />
              );
        } else {
          return (
            <SenderChat
              key={index}
              message={chat.message}
              username={chat.user}
              avatar={chat.avatar}
            />
          );
        }
      })}
    </div>
  );
};

export default ChatLists;
