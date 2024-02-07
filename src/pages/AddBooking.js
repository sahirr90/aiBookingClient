import { useParams } from "react-router-dom";
import { useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as bookingService from '../service/BookingService';
import {useNavigate } from "react-router-dom";
import ChatAI from "../components/ChatAI";

const theme = createTheme();

export function AddBooking() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [bookingStatus, setBookingStatus] = useState('')
  const [destinationFrom, setDestinationFrom] = useState('')
  const [destinationTo, setDestinationTo] = useState('')
  const [bookingFrom, setBookingFrom] = useState('')
  const [bookingTo, setBookingTo] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const booking = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      bookingFrom: data.get('bookingFrom'),
      bookingTo: data.get('bookingTo'),
      destinationFrom: data.get('destinationFrom'),
      destinationTo: data.get('destinationTo'),
      bookingStatus: data.get('bookingStatus')
    };

    bookingService.create(booking)
    .then(response => {
      navigate("/bookings");
    })

  };

    return(
     <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create Travel Booking
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  value={firstName}
                  onChange= {(e) => setFirstName(e.target.value)}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  value={lastName}
                  onChange= {(e) => setLastName(e.target.value)}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange= {(e) => setEmail(e.target.value)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="bookingStatus"
                  value={bookingStatus}
                  onChange= {(e) => setBookingStatus(e.target.value)}
                  label="Booking Status"
                  name="bookingStatus"
                  autoComplete="bookingStatus"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="destinationFrom"
                  value={destinationFrom}
                  onChange= {(e) => setDestinationFrom(e.target.value)}
                  label="Destination From"
                  name="destinationFrom"
                  autoComplete="destinationFrom"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="destinationTo"
                  value={destinationTo}
                  onChange= {(e) => setDestinationTo(e.target.value)}
                  label="Destination To"
                  name="destinationTo"
                  autoComplete="destinationTo"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="bookingFrom"
                  value={bookingFrom}
                  onChange= {(e) => setBookingFrom(e.target.value)}
                  label="Booking From"
                  name="bookingFrom"
                  autoComplete="bookingFrom"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="bookingTo"
                  value={bookingTo}
                  onChange= {(e) => setBookingTo(e.target.value)}
                  label="Booking To"
                  name="bookingTo"
                  autoComplete="bookingTo"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Save
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    )
  };

  export default AddBooking;
