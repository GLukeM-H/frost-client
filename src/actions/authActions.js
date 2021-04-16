/* eslint-disable no-use-before-define */
import axios from "axios";
import {
	BODY_GET,
	BODY_RESET,
	BODY_SET_DISPLAY_LOGIN,
	BODY_SET_SAVED_CHANGES,
	ERROR_LOGIN,
	USER_ERROR,
	USER_LOGIN,
	USER_LOGOUT,
	USER_RESET,
} from "../constants/actionTypes";

export function resetUser() {
	return {
		type: USER_RESET,
	};
}

export function authError(err) {
	return {
		type: USER_ERROR,
		payload: err,
	};
}

function addVisage(ownerId) {
	return async (dispatch, getState) => {
		const {
			rootId,
			contentComp: content,
			visageName: name,
		} = getState().contentState;
		const query = `
			mutation addVisage($visage: VisageFields!) {
				addVisage(visage: $visage) {
					_id
				}
			}
		`;

		try {
			const { data } = (
				await axios.post("/graphql", {
					query,
					variables: {
						visage: { ownerId, rootId, content, name },
					},
				})
			).data;
			if (!data.addVisage) throw new Error("Could not add Visage");

			return dispatch({ type: BODY_SET_SAVED_CHANGES, payload: true });
		} catch (err) {
			return dispatch(authError(err.toString()));
		}
	};
}

export function login(username, password) {
	return async (dispatch) => {
		const query = `
            mutation login($username: String!, $password: String!) {
                login(username: $username, password: $password) {
                    token,
                    error,
                    user {
						_id
                        username
						visage{
							_id
							content
							name
							rootId
						}
                    }
                }
            }
        `;
		try {
			const { token, error, user } = (
				await axios.post("/graphql", {
					query,
					variables: { username, password },
				})
			).data.data.login;

			if (error) throw error;

			dispatch({
				type: USER_LOGIN,
				payload: {
					token: token.toString(),
					username: user.username,
				},
			});
			dispatch({ type: BODY_SET_DISPLAY_LOGIN, payload: false });

			if (!user.visage) {
				return dispatch(addVisage(user._id));
			}

			dispatch({
				type: BODY_GET,
				payload: { ...user.visage },
			});

			return dispatch({ type: BODY_SET_SAVED_CHANGES, payload: true });
		} catch (err) {
			return dispatch({ type: ERROR_LOGIN, payload: err });
		}
	};
}

export function logout() {
	return (dispatch) => {
		dispatch({ type: USER_LOGOUT });
		dispatch({ type: BODY_RESET });
	};
}

export function register(username, password) {
	return async (dispatch) => {
		const query = `
            mutation addUser($username: String!, $password: String!) {
                addUser(username: $username, password: $password) {
                    username,
					_id
                }
            }
        `;
		try {
			const { addUser } = (
				await axios.post("/graphql", {
					query,
					variables: { username, password },
				})
			).data.data;

			if (addUser) {
				dispatch(addVisage(addUser._id, username));
				dispatch(login(username, password));
			}
			return dispatch({
				type: ERROR_LOGIN,
				payload: addUser ? "" : "Failed to register user",
			});
		} catch (err) {
			return dispatch({ type: ERROR_LOGIN, payload: err.toString() });
		}
	};
}
