import {
  Container,
  Card,
  Row,
  Text,
  Popover,
  Button,
  Grid,
} from "@nextui-org/react";
import Link from "next/link";
import styles from "./ThumbNav.module.css";

const ThumbNav = (props) => {
  return (
    <Container fluid justify="center">
      <Card className={styles.navbar}>
        <Grid.Container gap={2}>
          <Grid>
            <Link href="/home">
              <a>Home Feed</a>
            </Link>
          </Grid>
          <Grid>
            {" "}
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </Grid>
        </Grid.Container>
      </Card>
    </Container>
  );
};

export default ThumbNav;
