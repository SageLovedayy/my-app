import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Mock user data
const MOCK_USER = {
  email: "admin@me.com",
  password: "password123",
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if the provided credentials match the mock user
        if (
          credentials.email === MOCK_USER.email &&
          credentials.password === MOCK_USER.password
        ) {
          // Return the user object if authentication is successful
          return {
            email: MOCK_USER.email,
            accessToken: "mockAccessToken123", // Mock access token
          };
        } else {
          // Return null if authentication fails
          return null;
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
