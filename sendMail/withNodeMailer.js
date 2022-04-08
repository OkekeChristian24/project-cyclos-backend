const nodemailer = require("nodemailer");

const transport = {
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    }
};

const smtpTransport = {
    host: process.env.MAIL_SMTP_HOST,
    port: process.env.MAIL_SMTP_PORT,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.MAIL_SMTP_USER,
      pass: process.env.MAIL_SMTP_PASS,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    }
};
  

const transporter = nodemailer.createTransport(transport);

/**
 * 
let message = {
    ...
    html: 'Embedded image: <img src="cid:unique@nodemailer.com"/>',
    attachments: [{
        filename: 'image.png',
        path: '/path/to/file',
        cid: 'unique@nodemailer.com' //same cid value as in the html img src
    }]
}

 * 
 */

const notifyUserWithNodemailer = (userEmail, subject, message) => {
    
    const mailOptions = {
        from: "Cyclos Shop",
        to: userEmail,
        subject,
        html: `<div>${message}</div>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            return false;
        }
        return true;
    });
};

module.exports = notifyUserWithNodemailer;