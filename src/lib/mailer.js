import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(to, otp) {
  const subject = "Your One-Time Password (OTP) - FitLife";

  const text = `Your OTP code is ${otp}. It will expire in 5 minutes.`;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>FitLife OTP</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:20px 0 30px 0;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" 
                 style="border-collapse:collapse;background-color:#ffffff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
            <!-- Logo -->
            <tr>
              <td align="center" style="padding:40px 0;border-bottom:1px solid #eeeeee;">
                <img src="https://res.cloudinary.com/djoytexuc/image/upload/v1758654308/logo_ydadyd.png" 
                     alt="FitLife Logo" width="150" style="display:block;max-width:150px;height:auto;" />
              </td>
            </tr>
            <!-- Content -->
            <tr>
              <td style="padding:40px 30px 40px 30px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="color:#333333;font-size:22px;font-weight:bold;text-align:center;">
                      Your OTP Code
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 0;color:#555555;font-size:16px;line-height:24px;text-align:center;">
                      Use the following OTP to continue your login. This code will expire in <strong>5 minutes</strong>.
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:20px 0;">
                      <div style="display:inline-block;background:#28a745;color:#ffffff;
                                  padding:16px 32px;border-radius:6px;font-size:24px;
                                  font-weight:bold;letter-spacing:4px;">
                        ${otp}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:30px 0 15px 0;color:#888888;font-size:14px;line-height:20px;text-align:center;">
                      If you didn’t request this, please ignore this email.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background-color:#f9f9f9;padding:20px;text-align:center;color:#888888;font-size:12px;">
                &copy; ${new Date().getFullYear()} FitLife. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"FitLife" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
}
