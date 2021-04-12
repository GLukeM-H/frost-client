/* eslint-disable no-use-before-define */
import axios from "axios";

export function resetUser() {
	return {
		type: "USER/RESET",
	};
}

export function authError(err) {
	return {
		type: "USER/ERROR",
		payload: err,
	};
}

function addVisage(ownerId, username) {
	return async (dispatch, getState) => {
		const { rootId, contentComp: content } = getState().contentState;
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
						visage: { ownerId, rootId, content, name: `${username}'s Visage` },
					},
				})
			).data;
			if (data.addVisage) {
				dispatch({ type: "BODY/SET_SAVED_CHANGES", payload: true });
			}
			return dispatch(authError(data.addVisage ? "" : "Could not add Visage"));
		} catch (e) {
			return dispatch(authError(e.toString()));
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
			if (!error) {
				dispatch({
					type: "USER/LOGIN",
					payload: {
						token: token.toString(),
						username: user.username,
					},
				});
				dispatch({ type: "BODY/SET_DISPLAY_LOGIN", payload: false });

				if (user.visage) {
					dispatch({
						type: "BODY/GET",
						payload: {
							...user.visage,
						},
					});
					dispatch({ type: "BODY/SET_SAVED_CHANGES", payload: true });
				} else {
					dispatch(addVisage(user._id, user.username));
				}
			}
			return dispatch(authError(error));
		} catch (err) {
			return dispatch(authError(err.toString()));
		}
	};
}

export function logout() {
	return (dispatch) => {
		dispatch({ type: "USER/LOGOUT" });
		dispatch({ type: "BODY/RESET" });
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
			return dispatch(authError(addUser ? "" : "Failed to register user"));
		} catch (err) {
			return dispatch(authError(err.toString()));
		}
	};
}
