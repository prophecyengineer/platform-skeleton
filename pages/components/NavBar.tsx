import { Container, Card, Row, Text, Popover, Button, Grid } from "@nextui-org/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import styles from "./NavBar.module.css";

const Navbar = (props) => {  return (
    <Container fluid  justify='center' >
      <Card className={styles.navbar}>
      <Grid.Container gap={2}>
        
  <Grid>
      <SignIn/>
      
        </Grid>
        <Grid> <SignUp/></Grid>
       
        </Grid.Container>
      </Card>
    </Container>
  );
}

export default Navbar;