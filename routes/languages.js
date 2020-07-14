const router = require('express').Router();
const Language = require('../models/Language');

router.get('/:lang', async (req, res) => {
	const language = req.params.lang;
	try {
		const result = await Language.findOne({ language });
		if (result === null) throw new Error('Requested language not found');
		return res.status(200).json({ ok: true, result });
	} catch (err) {
		console.error(err);
		res.status(404).json({ message: 'Requested language not found' });
	}
	return res.status(200).json({ ok: true });
});

module.exports = router;
