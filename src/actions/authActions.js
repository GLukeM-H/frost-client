import axios from "axios";

export function login(username, password) {
	return (dispatch) => {
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

		axios
			.post("/graphql", {
				query,
				variables: { username, password },
			})
			.then((res) => {
				const { token, error, user } = res.data.data.login;
				dispatch({
					type: "USER/LOGIN",
					payload: {
						token,
						error,
						username: user?.username,
					},
				});
			});
	};
}

export function logout() {
	return {
		type: "USER/LOGOUT",
	};
}
