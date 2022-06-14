import AuthForm from "./components/authForm";

//public signup page


const SignIn = (props) => {
  return (
      <AuthForm mode="signup" />
  );
};

SignIn.authPage = true;

export default SignIn;
