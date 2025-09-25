import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import { findUserByEmail } from "@/lib/user";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const users = await dbConnect("users");

    const user = await findUserByEmail(email);
    if (!user) {
      // return generic message for security
      return new Response(
        JSON.stringify({
          message: "If this email exists, a reset link was sent",
        }),
        { status: 200 }
      );
    }

    // generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await users.updateOne(
      { email },
      { $set: { resetToken, resetTokenExpiry: expiry } }
    );

    // create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_API_URL}/reset-password/${resetToken}`;

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Password Reset</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style type="text/css">
      body { margin: 0; padding: 0; }
      table { border-collapse: collapse; }
    </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 20px 0 30px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc; background-color: #ffffff;">
              <tr>
                <td align="center" style="padding: 40px 0 30px 0; border-bottom: 1px solid #eeeeee;">
                  <img src="https://res.cloudinary.com/djoytexuc/image/upload/v1758654308/logo_ydadyd.png" alt="FitLife Logo" width="150" style="display: block;" />
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px 40px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="color: #333333; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold;">
                        Reset Your Password
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px 0 30px 0; color: #555555; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        We received a request to reset your password. Click the button below to choose a new one. This link will expire in 60 minutes.
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <a href="${resetLink}" style="background-color: #28a745; color: #ffffff; display: inline-block; padding: 16px 30px; text-decoration: none; border-radius: 5px; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold;">Reset Password</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 30px 0 15px 0; color: #888888; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; text-align: center;">
                        If the button doesn't work, copy and paste this link into your browser:
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: center; word-break: break-all;">
                        <a href="${resetLink}" style="color: #3366cc; font-size: 12px;">${resetLink}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background-color: #f9f9f9; padding: 30px 30px 30px 30px;">
                   <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="color: #888888; font-family: Arial, sans-serif; font-size: 14px; text-align: center;">
                        If you didn't request a password reset, please ignore this email.
                        <br/><br/>
                        &copy; ${new Date().getFullYear()} FitLife. All rights reserved.
                      </td>
                    </tr>
                   </table>
                </td>
              </tr>
            </table>
            </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    // send email
    await transporter.sendMail({
      from: `"FitLife" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Reset your password",
      html: emailHtml,
    });

    return new Response(JSON.stringify({ message: "Reset email sent" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
