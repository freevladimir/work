const nodemailer = require('nodemailer');

module.exports = async (email, transporter, url, userName) => {
	try {
		await transporter.sendMail({
			from: '"7top.org" <7top.bot@gmail.com>',
			to: email,
			subject: 'Reset password',
			text: `Follow this link to reset password for ${userName} account:'\n'${url}`,
			html: `<b>Follow this link to reset password for ${userName} account:</b><br><a href="${url}">Reset password</a>`,
		});
		return { ok: true };
	} catch (err) {
		console.error(err);
		return { ok: false };
	}
};
