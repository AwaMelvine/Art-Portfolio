import { SET_ERROR_MESSAGES } from "./types";

export const setErrorMessages = (errors) => ({
    type: SET_ERROR_MESSAGES,
    payload: errors
});