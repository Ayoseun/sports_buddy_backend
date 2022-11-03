
const nodemailer = require('nodemailer');

const mailHost = "smpt.gmail.com";
const mailPort = 587;
EMAIL = 'jaoquin15@gmail.com'
PASSWORD = 'baeeoikwpcivqupu'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: mailHost,
  port: mailPort,
  secure: false,
  auth: { user: EMAIL, pass: PASSWORD }
});




const sendMails = async (_to, OTP) => {
  const email = {
    from: 'Sportify',
    to: _to,
    subject: 'Sportify OTP',
    html: `
    <div
      class="container"
      style="max-width: 90%; margin: auto; padding-top: 20px"
    >
      <h2>Welcome to the club.</h2>
      <h4>You are officially In ✔</h4>
      <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
      <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${OTP}</h1>
      <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
    </div>
  `,

  };


  try {

    //here transporter is passed as a return object
    let info = await transporter.sendMail(email);
    return info
  } catch (error) {
    //we capture supposed errors
    console.log(error);
    return error

  }


}


//export nodemailer
module.exports = sendMails;