const nodemailer = require('nodemailer');
const { Router } = require('express');
const app = Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abc@gmail.com',
        // the sender name is written
    pass: 'semmsefnvfjzlvbc'
    // this pass is generated from the senders google acccount in the google/security website
  }
});

app.post('/send-email', (req, res) => {
  console.log(req.body)
  const { to, subject, text } = req.body; 
  const mailOptions = {
    from: 'abc@gmail.com',
    // the sender name is written
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error: Unable to send email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});



module.exports = app;