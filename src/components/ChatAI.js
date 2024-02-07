import React from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';
import Table from './Table';
import CRUDTable, { AddBooking } from '../pages/AddBooking';

import axios from 'axios';



const API_KEY = "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";

const systemMessage = {
  "role": "system",
  "content": "Explain things like you're talking to a customer who has travel needs, but keep it short and sweet."
}

function ChatAI() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Travel Smart! What can I do for you today?",
      sentTime: "just now",
      sender: "Travel Smart"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
        setIsTyping(false);
      });

      const cancelBooking = async (bookingNumber, firstName, lastName) => {
        try {
          await axios.post(`/api/booking/cancel`, {
            bookingNumber,
            firstName,
            lastName,
          });
    
          fetchBookings();
        } catch (error) {
          console.error('Error canceling booking:', error);
        }
      };
    
      const fetchBookings = async () => {
        try {
          const response = await axios.get(`/api/booking/all`);
          const fetchedBookings = response.data;
          // Update state or perform other actions with the fetched bookings
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };
  }

  return (
    <div className="App" style={{ display: "flex" }}>
      {/* Adjust the width percentages as needed */}
      <div style={{ width: '25%' }}>
        <MainContainer >
          <ChatContainer style={{ height: "90vh", flex: 1 }}>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="Agent is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
      <div style={{ width: '75%' }}>
      <AddBooking/>
      </div>
      
      
    </div>
  )
}

export default ChatAI;
