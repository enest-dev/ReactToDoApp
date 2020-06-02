import * as nodemailer from 'nodemailer';

export class NodeMailer {
  public transport: nodemailer;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: '',
        pass: '',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  public sendEmail(email: String, code: Number, callback: Function): any {
    const mailOptions = {
      from: email,
      to: email,
      subject: 'Forgot Password',
      html: `<h1>news App  </h1></br> <p>Enter this code to reset your password: ${code}</p></br>`,
    };
    this.transport.sendMail(mailOptions, callback);
  }
}
