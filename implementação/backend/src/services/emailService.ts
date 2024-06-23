import "dotenv/config";
import { MailService } from "@sendgrid/mail";

class EmailService {
  sengrid = new MailService();
  constructor() {
    this.sengrid.setApiKey(
      process.env.SENDGRID_API_KEY || ""
    );
  }

  async sendEmail(email: string, subject: string, message: string) {
    const msg = {
      to: email,
      from: "arthurjuju7@gmail.com",
      subject: subject,
      text: "dasdadas",
      html: `<strong>${message}</strong>`,
    };

    await this.sengrid.send(msg);
  }
}

export default EmailService;
