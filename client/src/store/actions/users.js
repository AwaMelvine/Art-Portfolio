import Axios from "axios";
import jwtDecode from 'jwt-decode';
import { SET_USER, SET_ERROR_MESSAGES } from "./types";

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const setErrorMessages = (errors) => ({
    type: SET_ERROR_MESSAGES,
    payload: errors
});

export const registerUser = user => dispatch => {
    return Axios.post('/api/register', user)
        .then(res => {
            localStorage.setItem('token', res.data.data);
            const user = jwtDecode(res.data.data);
            dispatch(setUser(user));
        })
        .catch(error => {
            const errors = [];
            for (let [key, value] of Object.entries(error.response.data.errors)) {
                errors.push(Object.values(value)[0]);
            }
            dispatch(setErrorMessages(errors));
        });
};

export const loginUser = user => dispatch => {
    return Axios.post('/api/login', user)
        .then(res => {
            localStorage.setItem('token', res.data.data);
            const user = jwtDecode(res.data.data);
            dispatch(setUser(user));
        })
        .catch(error => {
            const errors = [];
            for (let [key, value] of Object.entries(error.response.data.errors)) {
                errors.push(Object.values(value)[0]);
            }
            dispatch(setErrorMessages(errors));
        });
};

