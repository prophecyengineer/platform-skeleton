import { Container, Card, Row, Text, Popover, Button, Grid } from "@nextui-org/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Navbar = () => {  return (
    <Container fluid className="navbar" justify='center' >
      <Card css={{ $$cardColor: '$colors$primary' }}>
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