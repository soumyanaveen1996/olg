import { UPDATE_PROFILE_IMAGES } from "../actions/updateProfileImage";

let initialState = {};

function profileImagesReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_PROFILE_IMAGES:
			return {
				...state,
				...action.data,
			};
		default:
			return state;
	}
}

export default profileImagesReducer;
