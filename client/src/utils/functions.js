const getProfilePic = async (id) => {
	try {
		const data = await fetch(`/api/avatar/${id}`);
		const blob = await data.blob();
		return blob;
	} catch (err) {
		console.error(err);
	}
};

export { getProfilePic };
