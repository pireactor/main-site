require('dotenv').config()
const parser = require('lambda-multipart-parser');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

exports.handler = async function (event, context) {
  const res = await parser.parse(event);
  const body = `<ul>${Object.entries(res).map(i => `<li>${i[0]} - ${i[1]}</li>`)}<ul>`
  console.log(res)

  return mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: process.env.FROM_EMAIL_ADDRESS,
    to: process.env.CONTACT_TO_EMAIL_ADDRESS,
    subject: "New Form Submission",
    text: "pireactor-form",
    html: body,
  })
  .then(msg => {
    return {
      statusCode: msg.status,
      body: msg.message
    }
  })
  .catch(err => console.error(err));
}