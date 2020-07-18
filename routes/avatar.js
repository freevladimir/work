const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const jwt = require('jsonwebtoken');
const config = require('config');

const verifyToken = async (req, res, next) => {
	const token = req.header('auth-token');
	if (!token)
		return res.status(401).send({
			success: false,
			message: 'No token provided',
		});

	try {
		const verified = jwt.verify(token, config.get('jwtSecret'));
		req.user = verified;
		next();
	} catch (err) {
		return res.status(401).send({
			success: false,
			message: 'Invalid token',
		});
	}
};

router.post('/upload', verifyToken, function (req, res) {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let uplFile = req.files.file;
	console.log('req.body: ', req.body.userId);
	// Use the mv() method to place the fixle somewhere on your server
	console.log(uplFile);
	const extension = uplFile.name.split('.').pop();
	const imgPath = path.resolve('avatars', '', `${req.body.userId}.${extension}`);
	const folderPath = path.resolve('avatars', '');
	glob(folderPath + `/${req.body.userId}.*`, {}, (err, files) => {
        console.log(files);
		if (files.length > 0) {
			try {
                for(const file of files) {
                    fs.unlinkSync(file);
                    console.log('avatar deleted');
                }
			} catch (err) {
				console.error(err);
                return res.status(500).json({message: err.message});
			}
		}
        uplFile.mv(imgPath, function (err) {
            if (err) return res.status(500).send(err);
            console.log('avatar uploaded');
            res.send('File uploaded!');
        });
	});
});

router.get('/:userId', (req, res) => {
	const id = req.params.userId;
	const folderPath = path.resolve('avatars', '');
	glob(folderPath + `/${id}.*`, {}, (err, files) => {
		if (files.length > 0) {
			try {
				res.sendFile(files[0]);
			} catch (err) {
				console.error(err);
				res.status(500).json({ message: 'Something went wrong, try again later' });
			}
		} else {
			const defaultImgPath = path.resolve('avatars', '', 'noavatar.jpg');
			res.sendFile(defaultImgPath);
		}
	});
});

router.get('/id/:token', (req, res) => {
	try {
		const { userId } = jwt.verify(req.params.token, config.get('jwtSecret'));
		res.json({ ok: true, userId });
	} catch (err) {
		console.error(err);
		res.status(401).json({ message: 'Invalid token' });
	}
});

module.exports = router;
