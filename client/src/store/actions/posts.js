import Axios from "axios";
import { SET_POSTS } from "./types";

const setPosts = (post) => ({
    type: SET_POSTS,
    payload: post
});

export const fetchPosts = () => dispatch => {
    return Axios.get('/api/posts')
        .then(res => {
            const posts = res.data.data;
            dispatch(setPosts(posts));
        })
        .catch(error => {
            console.log(error)
        });
};



export const addPost = post => dispatch => {
    return Axios.post('/api/posts', post)
        .then(res => {
            const posts = res.data.data;
            dispatch(setPosts(posts));
        })
        .catch(error => {
            console.log(error)
        });
};


