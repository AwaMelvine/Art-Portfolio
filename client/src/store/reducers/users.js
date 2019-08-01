import { SET_USER, SET_ERROR_MESSAGES } from '../actions/types';

const initialState = {
    user: {},
    errors: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case SET_ERROR_MESSAGES:
            return {
                ...state,
                errors: action.payload
            };
        default:
            return state;
    }
};