import { Container, Card, Row, Text, Popover, Button, Grid } from "@nextui-org/react";
import Link from "next/link";

import styles from "./NavBar.module.css";

const Navbar = (props) => {  return (
    <Container fluid  justify='center' >
      <Card className={styles.navbar}>
      <Grid.Container gap={2}>
    
        
  <Grid>

  <Link href="/signin">

<Button  auto>
SignIn
</Button>
</Link>
      
        </Grid>
        <Grid>
        <Link href="/signup">
        <Button  auto>
Sign Up
</Button>
          </Link>

        </Grid>
       
        </Grid.Container>
      </Card>
    </Container>
  );
}

export default Navbar;