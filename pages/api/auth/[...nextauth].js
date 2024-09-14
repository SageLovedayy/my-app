import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
//import AppleProvider from "next-auth/providers/apple";
//import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
//import EmailProvider from "next-auth/providers/email";
//import { CredentialsProvider } from "next-auth/providers";
//import clientPromise from "@/lib/mongodb";
//import { MongoDBAdapter } from "@auth/mongodb-adapter";

const BACKEND_ACCESS_TOKEN_LIFETIME = 120 * 60; // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60; // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const SIGN_IN_HANDLERS = {
  credentials: async (user, account, profile, email, credentials) => {
    const { username } = credentials; //NEW
    // Save the username to the session object
    account.username = username; //NEW
    return true;
  },
};

const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);
//const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === "development";

export default NextAuth({
  providers: [
    CredentialsProvider({
      //name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // The data returned from this function is passed forward as the
      // `user` variable to the signIn() and jwt() callback
      async authorize(credentials) {
        // DEVMODE (Development credentials check)
        const DEV_USERNAME = process.env.NEXT_DEV_USER;
        const DEV_PASSWORD = process.env.NEXT_DEV_HS;

        if (
          credentials.username === DEV_USERNAME &&
          credentials.password === DEV_PASSWORD
        ) {
          console.log("Dev Mode: Development credentials detected.");
          return {
            id: "1",
            username: "Dev User",
            isDevelopment: true,
          };
        }

        // AUTHLOGIC: Simple placeholder authentication
        const MOCK_USER = {
          id: 1,
          username: "john.doe",
          password: "password123", // Store hashed passwords in production
          name: "John Doe",
        };

        // Simulating authentication logic
        if (
          credentials.username === MOCK_USER.username &&
          credentials.password === MOCK_USER.password
        ) {
          // Authentication successful, return user data
          console.log("Authentication successful for:", MOCK_USER.username);
          return {
            id: MOCK_USER.id,
            username: MOCK_USER.username,
            name: MOCK_USER.name,
          };
        } else {
          // Authentication failed
          console.log("Authentication failed. Invalid credentials.");
          return null; // Authentication failure, return null
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Passwordless / email sign in
    //    EmailProvider({
    //      server: process.env.MAIL_SERVER,
    //      from: "NextAuth.js <no-reply@example.com>",
    //    }),
  ],

  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/error",
    //verifyRequest: "/auth/verify-request",
    //newUser: "/auth/new-user",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user.isDevelopment) {
        console.log("DEVELOPMENT USER OBJECT", user);
        return true;
      }

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
        // ADDING DEV FLAG TO TOKEN
        console.log("USERRRR", user);
        token.isDevelopment = user.isDevelopment || false;
        token.username = user.username;
        token.access_token = user.access_token || "";
        token.refresh_token = user.refresh_token || "";
        token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }

      if (user && account) {
        console.log("USER AND ACCOUTN");
        let backendResponse =
          account.provider === "credentials" ? user : account.meta;
        //token = backendResponse;
        token.username = account.username; //NEW

        token["user"] = backendResponse.user; //---------------------------------------------
        token["username"] = backendResponse.username;
        token["companyname"] = backendResponse.companyname;
        token["branch"] = backendResponse.branch;
        //------------------------------------------
        //token.user = backendResponse.user;   //token["access_token"] = backendResponse.access;
        //---------------------------------------------------
        //token["access_token"] = backendResponse;
        token["access_token"] =
          backendResponse.access_token || "dummyacesstoken";
        token["refresh_token"] =
          backendResponse.refresh_token || "dummyrefreshtoken";
        //token["refresh_token"] = backendResponse.refresh;
        //--------------------------------------------------
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        //console.log("Access Token:", backendResponse);
        //localStorage.setItem("accessToken", backendResponse); //JUST ADDED, LET'S CHECK

        // REMEMBER ME LOGIC
        if (account?.rememberMe) {
          token.rememberMe = true;
        }
        console.log("Token: ", token);
        return token;
      }
      // Refresh the backend token if necessary - WHILE USER IS LOGGED IN
      if (getCurrentEpochTime() > token["ref"]) {
        console.log("TOKEN REFRESH REQUEST");
        const response = await axios({
          method: "post",
          url: process.env.NEXTAUTH_BACKEND_URL + "auth/token/refresh/",
          data: {
            refresh: token["refresh_token"],
          },
        });
        token["access_token"] = response.data.access;
        token["refresh_token"] = response.data.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }

      console.log("FINAL TOKEN ", token);
      return token;
    },
    // Since we're using Django as the backend we have to pass the JWT
    // token to the client instead of the `session`.

    async session({ token }) {
      //!IMPORTANT--- WE WILL UNCOMMENT THE ABOVE IN THE NEAREST FUTURE
      if (getCurrentEpochTime() > token["ref"]) {
        console.log("TOKEN REFRESH REQUEST");
        const response = await axios({
          method: "post",
          url: process.env.NEXTAUTH_BACKEND_URL + "auth/token/refresh/",
          data: {
            refresh: token["refresh_token"],
          },
        });
        token["access_token"] = response.data.access;
        token["refresh_token"] = response.data.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }

      console.log("TOKEN RECEIVED IN SESSION ", token);
      if (token.isDevelopment) {
        //RETURN OUR DUMMY TOKEN FOR DEV MODE
        console.log("DEV MODE");
        return {
          ...token,
        };
      }

      return {
        ...token,
        //username: username
        // THIS MANUAL SET ABOVE HAS TO BE DISABLED BEFORE PUSHING TO PROD. WE WILL BE SETTING COMPANY AND BRANCH UPON PROPER SWITCH TO COMPANY MODE
        // ALSO, THE IMPLEMENTATION MAY WARRANT US TO SET USERNAME UPON SWITCH BACK TO USER MODE
      
      };
    },
  },
  //adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
});
