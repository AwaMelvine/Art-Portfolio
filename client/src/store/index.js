import { combineReducers } from "redux";
import users from './reducers/users';
import posts from './reducers/posts';
import errors from './reducers/errors';

export default combineReducers({
    users,
    posts,
    errors
});
