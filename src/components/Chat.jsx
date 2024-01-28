'use client'; 
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import SendMessage from '../../public/send-message.png'
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef(null);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    const userMessage = { text: inputText, sender: 'user' };
    const newMessages = [...messages, userMessage];
  
    setMessages(newMessages); // Update with user message first
    setInputText('');
  
    // Send the message to your backend using fetch
    fetch('http://localhost:3001/api/receive-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userMessage),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const backendMessage = { text: data.sentiment, sender: 'backend' };
        const updatedMessages = [...newMessages, backendMessage];
        setMessages(updatedMessages); // Update with backend message
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="bg-opacity-80 backdrop-blur-md p-4 rounded-lg border border-black w-1/2 absolute left-0 top-500 h-full">
    <div className="h-80 overflow-y-auto" ref={chatContainerRef} style={{height: 500, width: 400}}>
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div
              className={`rounded-lg p-2 inline-block max-w-2/3 break-words ${
                message.sender === 'user' ? 'bg-gray-400 text-white bg-opacity-30' : 'bg-cyan-300 bg-opacity-30'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end" style={{width: 400}}>
        <div>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 bg-cyan-500 text-white rounded bg-opacity-50 hover:bg-opacity-100 ml-1"
          onClick={handleSendMessage}
        >
          <Image src={SendMessage} width={25} height={25} alt='Send'></Image>
        </button>
      </div>
      
    </div>
  );
};

export default Chat;