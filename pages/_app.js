import "@/styles/globals.css";
import "@/styles/style.css";
import { SessionProvider } from "next-auth/react";
import GeneralContextProvider from "@/context/GeneralContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <GeneralContextProvider>
        <Component {...pageProps} />
      </GeneralContextProvider>
    </SessionProvider>
  );
}
