import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      // !!(trick to convert any value to boolean)
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        if (!user.email) return false;
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name ?? "" });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      if (!session.user.email) throw new Error("Session email is missing");
      const guest = await getGuest(session.user.email);
      if (!guest) throw new Error("Guest profile could not be loaded");
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
