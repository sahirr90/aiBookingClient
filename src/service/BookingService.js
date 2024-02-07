import axios from 'axios';

const BOOKING_BASE_API_URL = 'http://localhost:8080/api/v1/book';

export function getAll(){
    return axios.get(BOOKING_BASE_API_URL);
}

export function create (booking){
    return axios.post(BOOKING_BASE_API_URL,booking);
}

export function getById(id){
    return axios.get(`${BOOKING_BASE_API_URL}/${id}`);
}

export function update(id, booking){
    return axios.put(`${BOOKING_BASE_API_URL}/${id}`, booking);
}

export function deleteBooking(id){
    return axios.delete(`${BOOKING_BASE_API_URL}/${id}`);
}