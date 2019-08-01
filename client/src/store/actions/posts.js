import Axios from "axios";
import { SET_POSTS } from "./types";

const setPost = (post) => ({
    type: SET_POSTS,
    payload: post
});

export const registerUser = user => dispatch => {
    return Axios.post('/api/register', user)
        .then(res => {
            const post = res.data.data;
            dispatch(setPost(post));
        })
        .catch(error => {
            console.log(error)
        });
};


