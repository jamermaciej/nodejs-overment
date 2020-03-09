const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const message = {};
message.from = 'maciek77jamer@gmail.com';
message.mail_settings = {
    sandbox_mode: {
        enable: process.env.NODE_ENV === 'production'
    }
}

exports.message = message;