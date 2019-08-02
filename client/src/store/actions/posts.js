import Axios from "axios";
import { SET_POSTS } from "./types";

const setPosts = (post) => ({
    type: SET_POSTS,
    payload: post
});

export const fetchPosts = user => dispatch => {
    return Axios.get('/api/posts')
        .then(res => {
            const posts = res.data.data;
            dispatch(setPosts(posts));
        })
        .catch(error => {
            console.log(error)
        });
};


