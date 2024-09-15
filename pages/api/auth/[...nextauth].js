import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MOCK_USERS } from "@/utils/mock-users"; //TO BE REMOVED...acting as makeshift database for now

const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60; // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60; // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const SIGN_IN_HANDLERS = {
  credentials: async (user, account, profile, email, credentials) => {
    account.username = credentials.username;
    return true;
  },
};

const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find the user based on the provided username
        const user = MOCK_USERS.find(
          (u) =>
            u.username === credentials.username &&
            u.password === credentials.password
        );

        if (user) {
          // Return the user object if authentication is successful
          return {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
          };
        } else {
          console.log("Authentication failed. Invalid credentials.");
          return null; // Return null if authentication fails
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
    async signIn({ user, account, profile, email, credentials }) {
      if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;

      return SIGN_IN_HANDLERS[account.provider](
        user,
        account,
        profile,
        email,
        credentials
      );
    },

    async jwt({ user, token, account }) {
      if (user) {
        token.isMockUser = user.username === "mockuser";
        token.username = user.username;
        token.access_token = "mock-access-token";
        token.refresh_token = "mock-refresh-token";
        token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }

      if (user && account) {
        token.username = account.username;
        token.access_token = user.access_token || "mock-access-token";
        token.refresh_token = user.refresh_token || "mock-refresh-token";
        token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        return token;
      }

      if (getCurrentEpochTime() > token.ref) {
        console.log("Refreshing token for mock user...");
        token.access_token = "mock-access-token";
        token.refresh_token = "mock-refresh-token";
        token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }

      return token;
    },

    async session({ token }) {
      if (token.isMockUser) {
        return { ...token };
      }

      if (getCurrentEpochTime() > token.ref) {
        console.log("Refreshing session token...");
        token.access_token = "mock-access-token";
        token.refresh_token = "mock-refresh-token";
        token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }

      return { ...token };
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
});
