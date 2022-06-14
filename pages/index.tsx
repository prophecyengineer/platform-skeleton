import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Lander.module.css";
import { Container, Card, Button, Grid } from "@nextui-org/react";
import Link from "next/link";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
require("dotenv").config();

const Home: NextPage = (props) => {
  const router = useRouter();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    signIn("credentials", {
      email,
      password,
      callbackUrl: `${window.location.origin}/home`,
      redirect: false,
    }).then((result) => {
      if (result.error !== null) {
        if (result.status === 401) {
          setLoginError(
            "Your username/password combination was incorrect. Please try again"
          );
        } else {
          setLoginError(result.error);
        }
      } else {
        router.push(result.url);
      }
    });
  };

  return (
    <div className={styles.container}>
      <Head>
      
      </Head>

      <main className={styles.main}>
        <Card className={styles.navbar}>
          <Grid.Container gap={1}>
            <Grid>
              <Link href="/signin">
                <Button size="sm" auto>
                  SignIn
                </Button>
              </Link>
            </Grid>
            <Grid>
              <Link href="/signup">
                <Button size="sm" auto>
                  Sign Up
                </Button>
              </Link>
            </Grid>
          </Grid.Container>
        </Card>

        <h1 className={styles.title}>Welcome Lander</h1>

        <Button>
          <Link href="/home">
            <Image
              width="40px"
              height="40px"
              alt="icon"
              src="https://img.icons8.com/glyph-neue/344/home.png"
            />
          </Link>
        </Button>

        <div>
          <form onSubmit={handleLogin}>
            {loginError}
            <label>
              Email:{" "}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password:{" "}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">Submit login</button>

            <Link href="/register">Register</Link>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
