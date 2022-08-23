const parser = require('lambda-multipart-parser');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);'});



exports.handler = async function (event, context) {
  // const fields = await parseMultipartForm(event)
  const res = await parser.parse(event);

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
