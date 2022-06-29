const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: '24d28a56c41161849195ad8edfbe5ad3-77985560-3a02edb4',
});
mg.messages
	.create(sandboxe5bc820059fc4283964d1c37c6911670.mailgun.org, {
		from: "Mailgun Sandbox <postmaster@sandboxe5bc820059fc4283964d1c37c6911670.mailgun.org>",
		to: ["ilia@e1off.dev"],
		subject: "Hello",
		text: "Testing some Mailgun awesomness!",
	})
	.then(msg => console.log(msg)) // logs response data
	.catch(err => console.log(err)); // logs any error`;