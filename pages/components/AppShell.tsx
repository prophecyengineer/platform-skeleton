import {
  Container,
} from "@nextui-org/react";
import { ReactFragment, ReactPortal } from "react";
import Navbar from "./NavBar";
import ThumbNav from "./ThumbNav";

import styles from "./AppShell.module.css";
type ReactNode =
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

const AppShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Container fluid className={styles.container}>
      <Navbar />
      {children}
      <ThumbNav />
    </Container>
  );
};

export default AppShell;
