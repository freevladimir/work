import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { userId, userImg } from '../pages/AllGamesPage';
import { useMessage } from '../hooks/message.hook';
import { useHistory } from 'react-router-dom';
import { getProfilePic } from '../utils/functions';
export let file;

export const ImageUpload = React.memo(({ token, profilePic }) => {
	const [state, setState] = useState({ imagePreviewUrl: profilePic });
	let user = userId;
	const message = useMessage();
	const history = useHistory();
	const maxSize = 4194304;
	let $imagePreview = null;
	const reader = new FileReader();

	const getExtension = (filename) => {
		var parts = filename.split('.');
		return parts[parts.length - 1];
	};

	const isImage = (filename) => {
		var ext = getExtension(filename);
		switch (ext.toLowerCase()) {
			case 'jpg':
			case 'jpeg':
			case 'heic':
			case 'png':
			case 'bmp':
			case 'gif':
				//etc
				return true;
		}
		return false;
	};

	const getUserId = async (token) => {
		const data = await fetch('/api/avatar/id/' + token);
		const res = await data.json();
		console.log(res);
		if (res.ok) {
			return res.userId;
		} else {
			throw new Error(res.message);
		}
	};

	if (!state.imagePreviewUrl) {
		(async () => {
			try {
				console.log(user);
				if (!user) user = await getUserId(token);
				const blob = await getProfilePic(user);
				reader.onload = function () {
					setState({ imagePreviewUrl: this.result });
					userImg.img = this.result;
				};
				reader.readAsDataURL(blob);
			} catch (err) {
				console.error(err);
				history.push('/');
			}
		})();
	}

	const _handleSubmit = async (file) => {
		try {
			if (!user) user = await getUserId(token);
		} catch (err) {
			console.error(err);
		}
		const data = new FormData();
		data.append('file', file);
		data.append('userId', user);
		console.log('handle uploading-', file);
		console.log(user);
		axios
			.post('/api/avatar/upload', data, { headers: { 'auth-token': token } })
			.then((res) => {
				console.log(res.statusText);
			})
			.catch((err) => {
				console.error(err);
				message('Something went wrong, try again later');
			});
	};

	const _handleImageChange = (e) => {
		e.preventDefault();
		file = e.target.files[0];
		if (isImage(file.name)) {
			if (file.size < maxSize) {
				reader.onloadend = () => {
					setState({
						imagePreviewUrl: reader.result,
					});
					userImg.img = reader.result;
					_handleSubmit(file);
				};
				reader.readAsDataURL(e.target.files[0]);
			} else {
				message('Maximum file size is 4mb');
			}
		} else {
			message('Supported formats: jpg, png, bmp, gif, jpeg');
		}
	};

	// const { imagePreviewUrl } = state;
	// $imagePreview = null;
	// if (imagePreviewUrl) $imagePreview =
	// else $imagePreview = <img src={getProfilePic(user)} />;

	return (
		<form onSubmit={(e) => _handleSubmit(e)}>
			<div className="elipse3">
				<input className="fileInput" name="avatar" id="fileInput" type="file" onChange={(e) => _handleImageChange(e)} />
				<div className="imgPreview">
					<img src={state.imagePreviewUrl} />
				</div>
			</div>
		</form>
	);
});
