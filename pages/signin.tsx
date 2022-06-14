import AuthForm from "./components/authForm";

//public signin page

const SignIn = (props) => {
    return (<AuthForm mode="signin"/>)
}

SignIn.authPage = true


export default SignIn