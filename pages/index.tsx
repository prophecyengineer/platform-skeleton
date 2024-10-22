import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Lander.module.css";
import {
  Text,
  Container,
  Card,
  Button,
  Grid,
  Input,
  Spacer,
} from "@nextui-org/react";
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

  const Password = ({ ...props }) => {
    return (
      <svg
        width={24 || 24 || 24}
        height={24 || 24 || 24}
        viewBox="0 0 24 24"
        {...props}
      >
        <g stroke={props.color || "#000"}>
          <path d="M18.75 8v2.1a12.984 12.984 0 00-1.5-.1V8c0-3.15-.89-5.25-5.25-5.25S6.75 4.85 6.75 8v2a12.984 12.984 0 00-1.5.1V8c0-2.9.7-6.75 6.75-6.75S18.75 5.1 18.75 8z" />
          <path d="M18.75 10.1a12.984 12.984 0 00-1.5-.1H6.75a12.984 12.984 0 00-1.5.1C2.7 10.41 2 11.66 2 15v2c0 4 1 5 5 5h10c4 0 5-1 5-5v-2c0-3.34-.7-4.59-3.25-4.9zM8.71 16.71A1.052 1.052 0 018 17a1 1 0 01-.38-.08 1.032 1.032 0 01-.33-.21A1.052 1.052 0 017 16a1 1 0 01.08-.38 1.155 1.155 0 01.21-.33 1.032 1.032 0 01.33-.21 1 1 0 011.09.21 1.155 1.155 0 01.21.33A1 1 0 019 16a1.052 1.052 0 01-.29.71zm4.21-.33a1.155 1.155 0 01-.21.33A1.052 1.052 0 0112 17a1.033 1.033 0 01-.71-.29 1.155 1.155 0 01-.21-.33A1 1 0 0111 16a1.033 1.033 0 01.29-.71 1.047 1.047 0 011.42 0A1.033 1.033 0 0113 16a1 1 0 01-.08.38zm3.79.33a1.014 1.014 0 01-1.42 0 1.014 1.014 0 010-1.42 1.047 1.047 0 011.42 0c.04.05.08.1.12.16a.556.556 0 01.09.17.636.636 0 01.06.18 1.5 1.5 0 01.02.2 1.052 1.052 0 01-.29.71z" />
        </g>
      </svg>
    );
  };

  const Mail = ({ ...props }) => {
    return (
      <svg
        width={24 || 24 || 24}
        height={24 || 24 || 24}
        viewBox="0 0 24 24"
        {...props}
      >
        <g
          fill="none"
          stroke={props.color || "#000"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <path d="M12 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v3" />
          <path d="M17 9l-3.13 2.5a3.166 3.166 0 01-3.75 0L7 9M19.21 14.77l-3.539 3.54a1.232 1.232 0 00-.3.59l-.19 1.35a.635.635 0 00.76.76l1.35-.19a1.189 1.189 0 00.59-.3l3.54-3.54a1.365 1.365 0 000-2.22 1.361 1.361 0 00-2.211.01zM18.7 15.28a3.185 3.185 0 002.22 2.22" />
        </g>
      </svg>
    );
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Card className={styles.navbar}>
          <Grid.Container gap={1}>
            <Grid>
              <div>
                <Card>
                  <Card.Header>
                    <Text size={12}>Sign In</Text>
                  </Card.Header>
                  <form onSubmit={handleLogin}>
                    <Card.Divider />

                    <Spacer />

                    <Grid>
                      <Card.Body>
                        <Input
                          bordered
                          color="primary"
                          size="lg"
                          aria-label="email"
                          aria-labelledby="email"
                          placeholder="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          contentLeft={
                            <Mail
                              fill="currentColor"
                              size={undefined}
                              height={undefined}
                              width={undefined}
                            />
                          }
                        />
                        <Spacer />

                        <Input
                          // aria-label="Password"
                          bordered
                          aria-label="Password"
                          aria-labelledby="password"
                          color="primary"
                          size="lg"
                          placeholder="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          contentLeft={
                            <Password
                              fill="currentColor"
                              size={undefined}
                              height={undefined}
                              width={undefined}
                            />
                          }
                        />
                        <Spacer />
                        <Card.Divider />
                      </Card.Body>
                      <Card.Footer>
                        <Button size="sm" type="submit">
                          Submit login
                        </Button>
                      </Card.Footer>
                    </Grid>
                  </form>
                  <Card.Divider />
                  {loginError}
                </Card>
              </div>
            </Grid>
            <Grid>
              <Link href="/register">
                <Button size="sm" auto>
                  Sign Up
                </Button>
              </Link>
            </Grid>
          </Grid.Container>
        </Card>

        <h1 className={styles.title}>Welcome Lander</h1>
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
