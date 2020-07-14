const { Schema, model } = require('mongoose');

const schema = new Schema(
	{
		language: { type: String },
		translation: { type: Object },
	},
	{ collection: 'languages' }
);

module.exports = model('Language', schema);
