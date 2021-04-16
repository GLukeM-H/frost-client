import {
	ERROR_AUTH_PASSWORD,
	ERROR_AUTH_USERNAME,
	ERROR_GET_VISAGE,
	ERROR_LOGIN,
	ERROR_REGISTER,
	ERROR_RESET,
	ERROR_SAVE_VISAGE,
} from "../constants/actionTypes";

export const setUsernameAuthErr = (err) => ({
	type: ERROR_AUTH_USERNAME,
	payload: err,
});

export const setPasswordAuthErr = (err) => ({
	type: ERROR_AUTH_PASSWORD,
	payload: err,
});

export const setLoginErr = (err) => ({
	type: ERROR_LOGIN,
	payload: err,
});

export const setRegisterErr = (err) => ({
	type: ERROR_REGISTER,
	payload: err,
});

export const setGetVisageErr = (err) => ({
	type: ERROR_GET_VISAGE,
	payload: err,
});

export const setSaveVisageErr = (err) => ({
	type: ERROR_SAVE_VISAGE,
	payload: err,
});

export const resetErr = () => ({
	type: ERROR_RESET,
});
