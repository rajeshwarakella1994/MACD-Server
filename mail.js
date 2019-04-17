var nodemailer = require('nodemailer');

// Create the transporter with the required configuration for Outlook
// change the user and pass !

var transporter = nodemailer.createTransport({
    host: 'mailrelay.nj.adp.com',
    port: 25,
    tls: { rejectUnauthorized: false },
    debug: true
})
    ;

// setup e-mail data, even with unicode symbols
module.exports.mailOptions = {
    // from: 'Admin@adp.com', // sender address (who sends)
    to: 'billakoori.ashok@adp.com', // list of receivers (who receives)
    subject: 'Form for Custom Majors Request ', // Subject line
    html: 'This is the first email sent with Nodemailer in Node.js' // html body
};


// send mail with defined transport object
module.exports.sendMail = (mailOptions) => {
    console.log("Sending...", mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }

        console.log('Message sent: ' + info.response);
    })
}