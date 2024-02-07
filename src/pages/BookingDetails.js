import { useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate } from "react-router-dom";
import * as bookingService from '../service/BookingService';
import {
    IconButton,
    Table,
    TableBody,
    TableCell, 
    TableHead,
    TableRow,
  } from '@mui/material';
import ChatAI from '../components/ChatAI';
  
export const BookingDetails = () => {
    const [bookings, setBookings]= useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        bookingService.getAll()
        .then(res => {
            setBookings(res.data);
        })
    }, [])
    const goToUpdate = (id) => {
        navigate(`/${id}`);
    }

    const deleteBooking = (id) => {
        console.log(id);
    }

    return (
        <div >
            <Table sx={{minWidth:700}}>
                <TableHead sx={{}}>
                <TableRow>
                    <TableCell>
                        Id
                    </TableCell>                        
                    <TableCell>
                        First Name
                    </TableCell>
                    <TableCell>
                        Last Name
                    </TableCell>
                    <TableCell>
                        Email
                    </TableCell>
                    <TableCell>
                        Booking Status
                    </TableCell>
                    <TableCell>
                        Destination From
                    </TableCell>
                    <TableCell>
                        Destination To
                    </TableCell>
                    <TableCell>
                        Booking From
                    </TableCell>
                    <TableCell>
                        Booking To
                    </TableCell>
                    <TableCell align="right">
                        Actions
                    </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        bookings.map((booking)=> {
                            return(
                                <TableRow
                                    hover
                                    key={booking.id}
                                >
                                    <TableCell>
                                        {booking.id}
                                    </TableCell>
                                    <TableCell>
                                        {booking.firstName}
                                    </TableCell>
                                    <TableCell>
                                        {booking.lastName}
                                    </TableCell>
                                    <TableCell>
                                        {booking.email}
                                    </TableCell>
                                    <TableCell>
                                        {booking.bookingStatus}
                                    </TableCell>
                                    <TableCell>
                                        {booking.destinationFrom}
                                    </TableCell>
                                    <TableCell>
                                        {booking.destinationTo}
                                    </TableCell>
                                    <TableCell>
                                        {booking.bookingFrom}
                                    </TableCell>
                                    <TableCell>
                                        {booking.bookingTo}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton component="a" onClick={()=> goToUpdate(booking.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton component="a" onClick={()=> deleteBooking(booking.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ) 
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}