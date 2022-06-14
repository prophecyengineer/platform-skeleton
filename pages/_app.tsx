import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { SSRProvider } from "react-bootstrap";
import {SessionProvider} from "next-auth/react"
import AppShell from "./components/AppShell";



function MyApp({ Component, pageProps }) {
  console.log("Got Session: ", pageProps.session);

  return (
    <SessionProvider options={{clientMaxAge: 0}} session={pageProps.session}>
      
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
