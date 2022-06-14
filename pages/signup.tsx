import AuthForm from "./components/authForm";

//public signup page


const SignUp = (props) => {
  return (
      <AuthForm mode="signup" />
  );
};

SignUp.authPage = true;

export default SignUp;
