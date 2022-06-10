import {
  Button,
  Loading,
  Card,
  Text,
  Container,
  Row,
  Input,
  Spacer,
  Modal,Checkbox,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC, useState, } from "react";
import React  from "react";
import { useSWRConfig } from "swr";
import NextImage from "next/image";
import { auth } from "../../lib/mutations";


const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password, username });
    setIsLoading(false);
    router.push("/hi");
  };



  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <div>
      <Button auto color="warning" shadow onClick={handler}>
        {mode}
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
                <form onSubmit={handleSubmit}>

        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to
            <Text b size={18}>
              NextUI
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>

        <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            // contentLeft={<Mail fill="currentColor" />}
            
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            // contentLeft={<Mail fill="currentColor" />}
            
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            // contentLeft={<Password fill="currentColor" />}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error"  onClick={closeHandler}>
            Close
          </Button>
          <Button type="submit" auto onClick={closeHandler}>
            {mode}
          </Button>
         
        </Modal.Footer>
        </form>

      </Modal>
    </div>
  );
}

  


export default AuthForm;
