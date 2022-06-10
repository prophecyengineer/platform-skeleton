import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@nextui-org/react";
import { SSRProvider } from 'react-bootstrap';

function MyApp({ Component, pageProps }: AppProps) {
  const styles = CssBaseline.flush();

  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}

export default MyApp;
