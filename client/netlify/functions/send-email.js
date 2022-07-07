const parser = require('lambda-multipart-parser');
require('dotenv').config()
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

function createBody(obj) {
  const html = Object.entries(obj).map(el => {
    `
    <span style="padding: 10px">
      ${el[0]}
    <span>
    <span style="padding: 10px">
      ${el[1]}
    <span>
    `
  });
  return html.join('');
}


// sandboxe5bc820059fc4283964d1c37c6911670.mailgun.org

exports.handler = async function (event, context) {
  // const fields = await parseMultipartForm(event);
  const res = await parser.parse(event);
  console.log(res)
  const body = `<ul>${Object.entries(res).map(i => `<li>${i[0]} - ${i[1]}</li>`)}<ul>`

  return mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: process.env.FROM_EMAIL_ADDRESS,
    to: process.env.CONTACT_TO_EMAIL_ADDRESS,
    subject: "Hello",
    text: "Testing some Mailgun awesomness!",
    html: body,
  })
  .then(msg => {
    console.log(msg)
    return {
      statusCode: msg.status,
      body: msg.message
    }
  }) // logs response data
  .catch(err => console.error(err));
}