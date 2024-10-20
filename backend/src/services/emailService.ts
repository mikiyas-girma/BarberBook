import nodemailer, { Transporter } from "nodemailer";
import PostmarkTransport from "nodemailer-postmark-transport";
import { htmlToText } from "html-to-text";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface bookingDetails {
  barberName: string;
  barberPhone: string,
  time: Date;
  date: Date;
  location: string;
}

export class sendEmail {
  private to: string;
  private firstName: string;
  private lastName: string;
  private from: string;

  constructor(user: User, url: any = "") {
    this.to = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.from = `BarberBook plc<${process.env.EMAIL_FROM}>`;
  }

  private newTransport(): Transporter {
    if (process.env.EMAIL_SERVICE === "postmark") {
      return nodemailer.createTransport(
        PostmarkTransport({
          auth: {
            apiKey: process.env.POSTMARK_API_KEY!,
          },
        })
      );
    } else {
      // SendGrid
      return nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY,
        },
      });
    }
  }

  private async send(subject: string, html: string): Promise<void> {
    const text = htmlToText(html);

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text,
    };

    try {
      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      console.log("Error in sending mail", mailOptions);
      console.log("Error", err);
    }
  }

  async sendWelcome(): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            color: #333333;
          }
          .content {
            margin-top: 20px;
            line-height: 1.6;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            Welcome to BarberBook, ${this.firstName}!
          </div>
          <div class="content">
            <p>Dear ${this.firstName} ${this.lastName},</p>
            <p>We're excited to have you on board!</p>
            <p>You are now Registered as Barber on BarberBook platform! </p>
          </div>
          <div class="footer">
            <p>Best regards,</p>
            <p>BarberBook plc</p>
          </div>
        </div>
      </body>
      </html>
    `;
    await this.send("Welcome to BarberBook!", html);
  }

  // New method to send event registration confirmation email
  async sendBookingConfirmation(bookingDetails: bookingDetails): Promise<void> {
    const { barberName, barberPhone, time, date, location } = bookingDetails;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            color: #333333;
          }
          .content {
            margin-top: 20px;
            line-height: 1.6;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            Appointment booking confirmation
          </div>
          <div class="content">
            <p>Dear ${this.firstName} ${this.lastName},</p>
            <p>Dear, <strong>${name}</strong>.</p>
            <p>You have successfully booked an appointment with our barber
             <strong> ${barberName}</strong>.</p>
            <p><strong>Appointment Details:</strong></p>
            <ul>
              <li><strong>Time:</strong> ${time}</li>
              <li><strong>End Time:</strong> ${date}</li>
              <li><strong>Location:</strong> ${location}</li>
            </ul>
            <p>Thank You For Choosing Us!</p>
          </div>
          <div class="footer">
            <p>Best regards,</p>
            <p>BarberBook plc</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await this.send("Appointment Booking Confirmation", html);
  }
}
