import React, { useState } from 'react';

const InputText = ({ addMessage }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() === "") return;
    addMessage({ message });
    setMessage("");
  };

  return (
    <div className=''>
      <div className=''>
        <div className='flex items-center gap-2 justify-center'>
          <textarea 
            onChange={(e) => setMessage(e.target.value)} 
            className='border-2 rounded-md text-xs p-2 w-96' 
            name='message' 
            id='message' 
            placeholder='Type Here' 
            rows='2'
            value={message} // Bind the textarea value to the state
          ></textarea>
          <button onClick={sendMessage} className='bg-blue-400 py-2 px-5 font-semibold text-sm border border-blue-400 rounded-md hover:bg-blue-500'>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputText;
