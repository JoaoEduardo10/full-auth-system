import nodemailer from "nodemailer";

interface EmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export class EmailSender {
  private transporter: nodemailer.Transporter;
  private host: string;
  private port: number;
  private secure: boolean;
  private user: string;
  private pass: string;

  constructor() {
    this.host = process.env.EMAIL_HOST || "";
    this.port = Number(process.env.EMAIL_PORT) || 0;
    this.secure = Boolean(process.env.EMAIL_SECURE) || false;
    this.user = process.env.EMAIL_USER || "";
    this.pass = process.env.EMAIL_PASS || "";

    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: this.secure,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
  }

  async sendEmail({ html, subject, text, to }: EmailParams) {
    try {
      await this.transporter.sendMail({
        from: `${this.user}`,
        to,
        subject,
        html,
        text,
      });

      console.log("Email, enviado!");
      this.transporter.close();
    } catch (error: any) {
      console.log(error.message);
      this.transporter.close();
    }
  }
}
