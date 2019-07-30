import Axios from "axios";
import jwtDecode from 'jwt-decode';
import { SET_USER } from "./types";

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const registerUser = user => dispatch => {
    return Axios.post('/api/register', user)
        .then(res => {
            localStorage.setItem('token', res.data.data);
            const user = jwtDecode(res.data.data);
            dispatch(setUser(user));
        })
        .catch(error => {
        });
};

