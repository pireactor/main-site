const parser = require('lambda-multipart-parser');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || '24d28a56c41161849195ad8edfbe5ad3-77985560-3a02edb4'});


// sandboxe5bc820059fc4283964d1c37c6911670.mailgun.org

exports.handler = async function (event, context) {
  // const fields = await parseMultipartForm(event)
  const res = await parser.parse(event);
  mg.messages.create("sandboxe5bc820059fc4283964d1c37c6911670.mailgun.org", res)
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
}



// require('dotenv').config()
//     const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_URL, FROM_EMAIL_ADDRESS, CONTACT_TO_EMAIL_ADDRESS } = process.env

//     exports.handler = async (event) => {
//       if (event.httpMethod !== 'POST') {
//         return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
//       }

//       const data = JSON.parse(event.body)
//       if (!data.message || !data.contactName || !data.contactEmail) {
//         return { statusCode: 422, body: 'Name, email, and message are required.' }
//       }

//       const mailgunData = {
//         from: FROM_EMAIL_ADDRESS,
//         to: CONTACT_TO_EMAIL_ADDRESS,
//         'h:Reply-To': data.contactEmail,
//         subject: `New contact from $`,
//         text: `Name: $\nEmail: $\nMessage: $


//       return mailgun.messages().send(mailgunData).then(() => ({
//         statusCode: 200,
//         body: "Your message was sent successfully! We'll be in touch."
//       })).catch(error => ({
//         statusCode: 422,
//         body: `Error: $
//       ))
//     }