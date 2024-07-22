import React, { useState } from "react";
import { IoMdChatboxes } from "react-icons/io";
import _ from "lodash";

const UserLogin = ({setUser}) => {
  const [userName, setUserName] = useState();
  const handleUser = () => {
    if(!userName) return;
    localStorage.setItem("user", userName);
    setUser(userName);
    localStorage.setItem("avatar", `https://picsum.photos/id/${_.random(1, 1000)}/200/300`)
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="">
        <div className="flex items-center justify-center gap-3">
          <div>
            <IoMdChatboxes className="text-3xl" />
          </div>
          <div className="text-lg">Chat App</div>
        </div>
        <div className="text-center pt-5">
          <input
            type="text"
            onChange={(e)=> setUserName(e.target.value)}
            className="border rounded-l-md px-2 py-1.5"
            placeholder="Enter Your Name"
          />
          <button onClick={handleUser} className="bg-blue-400 py-2 px-5 font-semibold text-sm border border-blue-400 rounded-e-md hover:bg-blue-500">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
