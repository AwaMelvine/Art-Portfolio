import { combineReducers } from "redux";
import users from './reducers/users';
import posts from './reducers/posts';

export default combineReducers({
    users,
    posts
});
