import {
  clearUserOtp,
  createUser,
  findUserByEmail,
  setUserOtp,
  updateUser,
} from "@/lib/user";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "@/lib/mailer";


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        otpVerified: { label: "OTP Verified", type: "text" },
      },
      async authorize(credentials, req) {
        // console.log("credentials", credentials);
        const email = credentials.email;
        const password = credentials.password;
        const otpVerified =
          credentials.otpVerified === true ||
          credentials.otpVerified === "true";

        const user = await findUserByEmail(email);
        if (!user) {
          return null;
        }

        if (user.lockUntil && user.lockUntil > Date.now()) {
          throw new Error("Account locked. Try again later.");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          // Increment failed attempts
          const attempts = (user.failedLoginAttempts || 0) + 1;

          if (attempts >= 5) {
            // Lock account for 15 minutes
            await updateUser(user.email, {
              failedLoginAttempts: attempts,
              lockUntil: Date.now() + 15 * 60 * 1000,
            });
            throw new Error(
              "Account locked for 15 minutes due to too many failed attempts."
            );
          } else {
            await updateUser(user.email, { failedLoginAttempts: attempts });
            throw new Error(`Invalid password. ${5 - attempts} attempts left.`);
          }
        }

        // if password is correct then send otp
        if (!otpVerified) {
          // generate OTP, save and email it
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          await setUserOtp(email, otp); // stores otpCode and otpExpires
          await sendOtpEmail(email, otp);

          throw new Error("OTP_SENT");
        }

        // 3. Reset on success
        await updateUser(user.email, {
          failedLoginAttempts: 0,
          lockUntil: null,
        });

        await clearUserOtp(email);

        return { id: user._id, name: user.name, email: user.email };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const existingUser = await findUserByEmail(user.email);
        if (!existingUser) {
          await createUser({
            name: user.name,
            email: user.email,
            password: "",
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
