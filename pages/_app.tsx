import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { SSRProvider } from "react-bootstrap";
import {SessionProvider} from "next-auth/react"
import AppShell from "./components/AppShell";



function MyApp({ session, Component, pageProps }) {
  return (
    <SessionProvider session={session}>
    {/* <SSRProvider> */}
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      )}
    {/* </SSRProvider> */}
    </SessionProvider>
  );
}

export default MyApp;
