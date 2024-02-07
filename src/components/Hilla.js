// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import { GridColumn } from "@hilla/react-components/GridColumn";
// import { Grid } from "@hilla/react-components/Grid";
// import { MessageList } from "@hilla/react-components/MessageList";
// import { MessageInput } from "@hilla/react-components/MessageInput";
// import { SplitLayout } from "@hilla/react-components/SplitLayout";
// import { nanoid } from "nanoid";



// const chatId = nanoid();

// const App = () => {
//   const [working, setWorking] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       userName: 'Assistant',
//       text: 'Welcome to Funnair! How can I help you?',
//       userColorIndex: 1
//     }
//   ]);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetchBookings();
//   }, [working]);

//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get('/api/booking/all');
//       setBookings(response.data);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     }
//   };

//   const addMessage = (message) => {
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   const appendToLastMessage = (chunk) => {
//     setMessages((prevMessages) => {
//       const lastMessage = prevMessages[prevMessages.length - 1];
//       lastMessage.text += chunk;
//       return [...prevMessages.slice(0, -1), lastMessage];
//     });
//   };

//   const sendMessage = async (message) => {
//     setWorking(true);
//     addMessage({
//       text: message,
//       userName: 'You',
//       userColorIndex: 2
//     });

//     let first = true;
//     try {
//       const response = await axios.post('/api/assistant/chat', {
//         chatId,
//         message
//       });

//       response.data.forEach((chunk) => {
//         if (first && chunk) {
//           addMessage({
//             text: chunk,
//             userName: 'Assistant',
//             userColorIndex: 1
//           });
//           first = false;
//         } else {
//           appendToLastMessage(chunk);
//         }
//       });
//     } catch (error) {
//       console.error('Error sending message:', error);
//     } finally {
//       setWorking(false);
//     }
//   };
//   const getBookingDetails = async (bookingNumber, firstName, lastName) => {
//     try {
//       setWorking(true);

//       await axios.post('/api/booking/details', {
//         bookingNumber,
//         firstName,
//         lastName,
        
//       });

     
//       fetchBookings();
//     } catch (error) {
//       console.error('Error getting booking details:', error);
//     } finally {
//       setWorking(false);
//     }
//   };

//   const changeBooking = async (bookingNumber, firstName, lastName, date, from, to) => {
//     try {
//       setWorking(true);

//       await axios.post('/api/booking/change', {
//         bookingNumber,
//         firstName,
//         lastName,
//         date,
//         from,
//         to,
//       });

//       fetchBookings();
//     } catch (error) {
//       console.error('Error changing booking:', error);
//     } finally {
//       setWorking(false);
//     }
//   };

//   const cancelBooking = async (bookingNumber, firstName, lastName) => {
//     try {
//       setWorking(true);
//       await axios.post('/api/booking/cancel', {
//         bookingNumber,
//         firstName,
//         lastName,
//       });

//       fetchBookings();
//     } catch (error) {
//       console.error('Error canceling booking:', error);
//     } finally {
//       setWorking(false);
//     }
//   };

//   return (
//     <SplitLayout className="h-full">
//       <div className="flex flex-col gap-m p-m box-border h-full" style={{ width: '30%' }}>
//         <h3>Customer support</h3>
//         <MessageList items={messages} className="flex-grow" />
//         <MessageInput onSubmit={(e) => sendMessage(e.detail.value)} />
//       </div>
//       <div className="flex flex-col gap-m p-m box-border" style={{ width: '70%' }}>
//         <h3>Bookings database</h3>
//         <Grid items={bookings} className="flex-shrink-0">
//           <GridColumn path="bookingNumber" autoWidth />
//           <GridColumn path="firstName" autoWidth />
//           <GridColumn path="lastName" autoWidth />
//           <GridColumn path="date" autoWidth />
//           <GridColumn path="from" autoWidth />
//           <GridColumn path="to" autoWidth />
//           <GridColumn path="bookingStatus" autoWidth />
//           <GridColumn path="bookingClass" autoWidth />
//         </Grid>
//         {/* Add buttons or UI elements to trigger changeBooking and cancelBooking */}
//         <div>
//           <button onClick={() => changeBooking(/* pass booking details */)}>Change Booking</button>
//           <button onClick={() => cancelBooking(/* pass booking details */)}>Cancel Booking</button>
//         </div>
//       </div>
//     </SplitLayout>
//   );
// };

// export default App;
