import { Container, Card, Button, Grid } from "@nextui-org/react";
import { ReactFragment, ReactPortal } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./AppShell.module.css";
import * as React from "react";
import { useRouter } from "next/router";
import { forwardRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type ReactNode = ReactFragment | ReactPortal | boolean | null | undefined;

  const AppShell = ({children}) => {
    const session = useSession();
    const router = useRouter();
    if (
      (session !== null && session?.status === "authenticated") ||
      router.pathname === "/" ||
      router.pathname === "/register"
    ) {
      return (
        <Container fluid className={styles.container}>
          <Card className={styles.header}>
              <Button  onClick={signOut}>Sign Out</Button>
          </Card>
          <Container className={styles.innercontainer}>{children}</Container>
          <Card className={styles.thumbnav}>
            <Button.Group size="xl">
              <Link href="/home">
                <Button>
                  <Image
                    width="40px"
                    height="40px"
                    alt="icon"
                    src="https://img.icons8.com/glyph-neue/344/home.png"
                  />
                </Button>
              </Link>
              <Button>
                <Link href="/explore">
                  <Image
                    width="40px"
                    height="40px"
                    alt="icon"
                    src="https://img.icons8.com/glyph-neue/344/europe.png"
                  />
                </Link>
              </Button>
              <Link href="/profile">
                <Button>
                  <Image
                    width="40px"
                    height="40px"
                    alt="icon"
                    src="https://img.icons8.com/glyph-neue/344/user-location.png"
                  />
                </Button>
              </Link>
              <Link href="/">
                <Button>
                  <Image
                    width="40px"
                    height="40px"
                    alt="icon"
                    src="https://img.icons8.com/glyph-neue/344/settings.png"
                  />
                </Button>
              </Link>
            </Button.Group>
          </Card>
        </Container>
      );
    } else {
      return (
        <Container fluid className={styles.container}>
          <Card className={styles.header}>
            <h1>You are not authenticated</h1>

            <Link href="/">
              <Button>Back to Login</Button>
            </Link>
          </Card>
        </Container>
      );
    }
  };


export default AppShell;
