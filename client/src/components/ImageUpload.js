import React, { useCallback, useContext, useEffect, useState } from 'react';

const ImageUpload = (time) => {
	const [state, setState] = useState({ file: '', imagePreviewUrl: '' });

	const _handleSubmit = (e) => {
		e.preventDefault();
		// TODO: do something with -> this.state.file

		// request("/api/link/upload", "POST", this.state.file);
		console.log('handle uploading-', state.file);
	};

	const _handleImageChange = (e) => {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];
		console.log([file]);
		reader.onloadend = () => {
			setState({
				file: file,
				imagePreviewUrl: reader.result,
			});
			_handleSubmit(e);
		};

		reader.readAsDataURL(file);
	};

	// render() {
	//   let {imagePreviewUrl} = state;
	//   let $imagePreview = null;
	//   if (imagePreviewUrl) {
	//     $imagePreview = (<img src={imagePreviewUrl} />);
	//   }

	return (
		<form onSubmit={(e) => _handleSubmit(e)}>
			<div className="elipse3">
				<input className="fileInput" id="fileInput" type="file" onChange={(e) => _handleImageChange(e)} />
				<div className="imgPreview">{state ? <img src={state} /> : ''}</div>
			</div>
		</form>
	);
};

export default ImageUpload;
