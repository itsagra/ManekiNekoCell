let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'buatnodmeler@gmail.com',
        pass: 'nodmeler1234'
    }
});

// let mailOptions = {
//     from: 'buatnodmeler@gmail.com',
//     to: 'ftrahl@gmail.com',
//     subject: 'Sending Email using Nodejs',
//     text: 'That was easy!'
// };

module.exports = transporter