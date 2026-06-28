import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "@/app/_services/data-service";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      // !!(trick to convert any value to boolean)
      return !!auth?.user;
      //return true;
      /*
      const isLoggedIn = !!auth?.user;
      const isAuthRoute = request.nextUrl.pathname.startsWith("/api/auth");

      if (isAuthRoute) return true;
      return isLoggedIn;
      */
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// this is object destructing of NextAuth
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

//const handler = NextAuth(authConfig);
//export{ handler as GET, handler as POST}

//export {GET, POST} from "@/app/_services/auth"
