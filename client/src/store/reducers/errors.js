import { SET_ERROR_MESSAGES } from '../actions/types';


export default (state = null, action) => {
    switch (action.type) {
        case SET_ERROR_MESSAGES:
            return action.payload;
        default:
            return state;
    }
};