import * as actionTypes from "./actionTypes";

const initialState: UsersState = {
	users: []
};

const reducer = (
	state: UsersState = initialState,
	action: UsersAction
): UsersState => {
	const newUsers: uList = action.user;
	switch (action.type) {
		case actionTypes.GET_USERS:
			return {
				...state,
				users: state.users.concat(newUsers)
			};
	}
	return state
};

export default reducer;
