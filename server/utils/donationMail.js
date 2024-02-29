const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tejaskjain2003@gmail.com',
    pass: 'tjwf zmvv ogco dqrt',
  },
});

const sendEmail = (to, donorName, donationAmount) => {
  const mailOptions = {
    from: 'tejaskjain2003@gmail.com',
    to,
    subject: 'Thank You for Your Donation!',
    html: `<h1>Thank You for Your Generous Donation!</h1>
    <p>Dear ${donorName},</p>
    <p>We want to express our deepest gratitude for your recent donation. Your generosity makes a significant impact and helps us further our mission.</p>
    <p>Details of your donation:</p>
    <ul>
        <li><strong>Donation Amount:</strong> $${donationAmount}</li>
    </ul>
    <p>Your support is invaluable to us, and it enables us to continue our work in [mention the cause or initiative].</p>
    <p>If you have any questions or would like more information about how your donation is making a difference, feel free to contact us.</p>
    <p>Once again, thank you for your kindness and support!</p>
    <p>Best regards,</p>
    <p>Your Organization's Name</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;
