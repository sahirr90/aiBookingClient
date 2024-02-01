import React from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';
import Table from './Table';
import Footer from './Footer';

const API_KEY = "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";

const systemMessage = {
  "role": "system",
  "content": "Explain things like you're talking to a customer who has travel needs."
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
  }

  return (
    <div className="App" style={{ display: "flex" }}>
      {/* Adjust the width percentages as needed */}
      <div style={{ width: '25%' }}>
        <MainContainer >
          <ChatContainer style={{ height: "90vh", flex: 1 }}>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
      {/* The other component will take up 30% of the screen width */}
      <div style={{ width: '75%' }}>
      <Table />
      </div>
      
      
    </div>
  )
}

export default ChatAI;

// import React, { useEffect, useState } from "react";
// import { nanoid } from "nanoid";
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// const chatId = nanoid();

// export default function ChatAI() {
//     const [working, setWorking] = useState(false);
//     const [messages, setMessages] = useState([
//         {
//             role: 'system',
//             content: 'Welcome to Funnair! How can I help you?',
//         },
//     ]);

//     useEffect(() => {
//         // Update bookings when we have received the full response
//         if (!working) {
//             fetchBookings();
//         }
//     }, [working]);

//     async function fetchBookings() {
//         try {
//             const response = await fetch("http://localhost:8080/api/bookings");
//             if (!response.ok) {
//                 throw new Error("Failed to fetch bookings");
//             }
//             const bookingsData = await response.json();
//             // Set bookings data (if needed)
//         } catch (error) {
//             console.error("Error fetching bookings:", error);
//         }
//     }

//     function addMessage(message) {
//         setMessages((messages) => [...messages, message]);
//     }

//     async function sendMessage(messageContent) {
//         setWorking(true);
//         const userMessage = {
//             role: 'user',
//             content: messageContent,
//         };
//         addMessage(userMessage);

//         let first = true;
//         try {
//             const response = await fetch(
//                 `http://localhost:8080/api/chat?chatId=${chatId}&message=${encodeURIComponent(
//                     messageContent
//                 )}`
//             );
//             if (!response.ok) {
//                 throw new Error("Failed to send message");
//             }
//             const chunks = await response.json();
//             chunks.forEach((chunk) => {
//                 if (first && chunk) {
//                     addMessage({
//                         role: 'system',
//                         content: chunk,
//                     });
//                     first = false;
//                 } else {
//                     addMessage({
//                         role: 'system',
//                         content: chunk,
//                     });
//                 }
//             });
//         } catch (error) {
//             console.error("Error sending message:", error);
//         } finally {
//             setWorking(false);
//         }
//     }

//     return (
//         <div className="App" style={{ display: "flex" }}>
//             {/* Adjust the width percentages as needed */}
//             <div style={{ width: '25%' }}>
//                 <MainContainer>
//                     <ChatContainer style={{ height: "90vh", flex: 1 }}>
//                         <MessageList>
//                             {messages.map((message, i) => (
//                                 <Message key={i} model={message} />
//                             ))}
//                         </MessageList>
//                         <MessageInput placeholder="Type message here" onSend={sendMessage} />
//                         {working && <TypingIndicator content="ChatGPT is typing" />}
//                     </ChatContainer>
//                 </MainContainer>
//             </div>
//             {/* The other component will take up 75% of the screen width */}
//             <div style={{ width: '75%' }}>
//                 {/* Add your Table component here */}
//             </div>
//         </div>
//     );
// }
