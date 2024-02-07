import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

const theme = createTheme();

export const UpdateBooking = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bookingStatus: '',
    destinationFrom: '',
    destinationTo: '',
    bookingFrom: '',
    bookingTo: ''
  });

  useEffect(() => {
    bookingService.getById(id)
      .then(response => {
        const user = response.data;
        setBookingData(user);
      })
      .catch(error => {
        console.error('Error fetching booking:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    bookingService.update(id, bookingData)
      .then(response => {
        console.log('Booking updated successfully:', response);
        navigate("/add");
      })
      .catch(error => {
        console.error('Error updating booking:', error);
      });
  };

  return (
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
            Update
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  value={bookingData.firstName}
                  onChange={handleChange}
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
                  value={bookingData.lastName}
                  onChange={handleChange}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              {/* Add other fields similarly */}
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
  );
};
