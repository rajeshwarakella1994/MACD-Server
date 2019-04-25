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
    from: 'abcd@adp.com', // sender address (who sends)
    to: 'rajeshwar.akella@adp.com', // list of receivers (who receives)
    subject: 'Form for Custom Majors Request ', // Subject line
};


// send mail with defined transport object
module.exports.sendMail = (mailOptions) => {
    // console.log("Sending...", mailOptions);
    console.log("Sending mail ...");
    return new Promise((resolve, reject)=>{
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
                return;
            }
            resolve('Message sent: ' + info.response)
        })    
    })
}