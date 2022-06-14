import { Container, Card, Button, Grid } from "@nextui-org/react";
import { ReactFragment, ReactPortal } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./AppShell.module.css";
import Wrapper from "../components/Wrapper";

type ReactNode = ReactFragment | ReactPortal | boolean | null | undefined;

const AppShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Wrapper>
     
    <Container fluid className={styles.container}>
    
    <Card className={styles.header}>
    <Link href="http://localhost:3000/auth/signout">
<Button >Log Out</Button>
</Link>
</Card>
      <Container className={styles.innercontainer}>{children}</Container>
      <Card className={styles.thumbnav}>
        <Button.Group size="xl">
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
          <Button>
            <Link href="/profile">
              <Image
                width="40px"
                height="40px"
                alt="icon"
                src="https://img.icons8.com/glyph-neue/344/user-location.png"
              />
            </Link>
          </Button>
          <Button>
            <Link href="/">
              <Image
                width="40px"
                height="40px"
                alt="icon"
                src="https://img.icons8.com/glyph-neue/344/settings.png"
              />
            </Link>
          </Button>
        </Button.Group>
      </Card>
    </Container>
    </Wrapper>
  );
};

export default AppShell;
