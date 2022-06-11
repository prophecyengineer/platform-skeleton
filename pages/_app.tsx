import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";

import AppShell from "./components/AppShell";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      )}
    </SSRProvider>
  );
}

export default MyApp;
