/* eslint-disable no-use-before-define */
import axios from "axios";

export function authError(err) {
	return {
		type: "USER/ERROR",
		payload: err,
	};
}

function createVisage(ownerId, username) {
	return async (dispatch) => {
		const query = `
			mutation addVisage($ownerId: ID!, $name: String!) {
				addVisage(ownerId: $ownerId, name: $name) {
					_id
				}
			}
		`;

		const res = await axios.post("/graphql", {
			query,
			variables: { ownerId, name: `${username}'s Visage` },
		});
		const { addVisage } = res.data.data;
		if (!addVisage) {
			dispatch(authError("Could not add Visage"));
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
                        username
                    }
                }
            }
        `;

		try {
			const res = await axios.post("/graphql", {
				query,
				variables: { username, password },
			});
			const { token, error, user } = res.data.data.login;
			if (!error) {
				dispatch({
					type: "USER/LOGIN",
					payload: {
						token: token.toString(),
						username: user.username,
					},
				});
			}
			dispatch(authError(error));
		} catch (err) {
			dispatch(authError(err.toString()));
		}
	};
}

export function logout() {
	return (dispatch) => {
		authError(null);
		dispatch({
			type: "USER/LOGOUT",
		});
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
			const res = await axios.post("/graphql", {
				query,
				variables: { username, password },
			});

			const { addUser } = res.data.data;
			if (addUser) {
				dispatch(createVisage(addUser._id, username));
				dispatch(login(username, password));
			}
			dispatch(authError(addUser ? "" : "Failed to register user"));
		} catch (err) {
			dispatch(authError(err.toString()));
		}
	};
}
