import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer'
@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    private email: string;
    private password: string;

    constructor() {
        this.email = "ahmedeid2684@gmail.com";
        this.password = "sgot zvhr pwss lbej";

        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: this.email,
                pass: this.password,
            }
        })
    }

    async sendResetPasswordEmail(email: string, resetPasswordUrl: string) {
        const message = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Music Store - Password Reset URL',
            text: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #f9f9f9;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="https://github.com/ahmedeid6842/music-store/assets/57197702/ad42a809-b0a2-4905-aab8-108d942492bc" alt="Company Logo" style="max-width: 150px;">
                    </div>
                    <div style="background-color: #fff; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #333; margin-bottom: 20px;">Password Reset</h2>
                        <p style="color: #555;">Dear User,</p>
                        <p style="color: #555;">You have requested to reset your password. Click the link below to proceed:</p>
                        <a href="${resetPasswordUrl}" style="display: inline-block; text-decoration: none; padding: 10px 20px; background-color: #007bff; color: #fff; border-radius: 5px; margin-bottom: 20px;">Reset Password</a>
                        <p style="color: #555;">If you did not request this change, please ignore this email.</p>
                        <p style="color: #555; margin-top: 20px;">Best Regards,<br>Music Store</p>
                    </div>
                </div>
            `,
        };

        return await this.transporter.sendMail(message);
    }

    async sendVerificationEmail(email: string, verificationCode: string) {
        const message = {
            from: this.email,
            to: email,
            subject: 'Music Store - Account Verification',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #f9f9f9;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="https://github.com/ahmedeid6842/music-store/assets/57197702/ad42a809-b0a2-4905-aab8-108d942492bc" alt="Company Logo" style="max-width: 150px;">
                </div>
                <div style="background-color: #fff; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #333; margin-bottom: 20px;">Account Verification</h2>
                    <p style="color: #555;">Dear User,</p>
                    <p style="color: #555;">Welcome to our platform! To get started, please verify your account using the code below:</p>
                    <div style="text-align: center; background-color: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 8px;">
                        <h3 style="margin: 0; font-size: 24px; color: #333;">${verificationCode}</h3>
                    </div>
                    <p style="color: #555;">This code will expire in 1 hour. Thank you for choosing our service!</p>
                    <p style="color: #555; margin-top: 20px;">If you didn't sign up for an account, please ignore this email.</p>
                    <p style="color: #555;">Best Regards,<br>Music Store</p>
                </div>
            </div>
            `,
        };

        return await this.transporter.sendMail(message);
    }
}