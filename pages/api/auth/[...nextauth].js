import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [

    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            "https://mg-fit.vercel.app/api/v1/users/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await res.json();

          // Check if the response contains a token
          if (data.token) {
            // Return the user object if authentication is successful
            return {
              email: credentials.email,
              accessToken: data.token,
            };
          } else {
            return null; // Return null if authentication fails
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Return null if there's an error
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/error",
  },

  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
});
