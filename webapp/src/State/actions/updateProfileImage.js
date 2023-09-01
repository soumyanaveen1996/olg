export const UPDATE_PROFILE_IMAGES = "UPDATE_PROFILE_IMAGES";

export function updateProfileImage(data) {
	return (dispatch) => {
		dispatch({
			type: UPDATE_PROFILE_IMAGES,
			data: { ...data },
		});
	};
}
