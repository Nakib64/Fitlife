import {
  clearUserOtp,
  createUser,
  findUserByEmail,
  findUserById,
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
      async authorize(credentials) {
        const { email, password } = credentials;
        const otpVerified =
          credentials.otpVerified === true ||
          credentials.otpVerified === "true";

        const user = await findUserByEmail(email);
        if (!user) throw new Error("USER_NOT_FOUND");

        if (user.lockUntil && user.lockUntil > Date.now()) {
          throw new Error("ACCOUNT_LOCKED");
        }

        if (user.isBanned) {
          throw new Error("USER_BANNED");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          const attempts = (user.failedLoginAttempts || 0) + 1;
          if (attempts >= 5) {
            await updateUser(email, {
              failedLoginAttempts: attempts,
              lockUntil: Date.now() + 15 * 60 * 1000,
            });
            throw new Error("ACCOUNT_LOCKED");
          } else {
            await updateUser(email, { failedLoginAttempts: attempts });
            throw new Error("INVALID_PASSWORD");
          }
        }

        // If password correct, send OTP first
        if (!otpVerified) {
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          await setUserOtp(email, otp);
          await sendOtpEmail(email, otp);
          throw new Error("OTP_SENT");
        }

        // Reset failed attempts & clear OTP
        await updateUser(email, { failedLoginAttempts: 0, lockUntil: null });
        await clearUserOtp(email);

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
          isBanned: user.isBanned || false,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Create new user on first Google login
      if (account?.provider === "google") {
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

    async jwt({ token, user }) {
      // On first login, attach fields
      if (user) {
        token.role = user.role || "user";
        token.isBanned = user.isBanned || false;
      } else {
        // On subsequent requests, fetch fresh data from DB
       let dbUser = null;
try {
  // only try if sub is valid Mongo ObjectId
  if (/^[a-fA-F0-9]{24}$/.test(token.sub)) {
    dbUser = await findUserById(token.sub);
  } else if (token.email) {
    dbUser = await findUserByEmail(token.email);
  }
} catch (err) {
  console.error("Error fetching user in JWT callback:", err);
}

        if (dbUser) {
          token.role = dbUser.role || "user";
          token.isBanned = dbUser.isBanned || false;
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Expose these fields in the session for client-side use
      if (session?.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.isBanned = token.isBanned;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
