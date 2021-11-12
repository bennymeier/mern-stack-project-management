import React, { useState, useEffect } from "react";
import { Form, Segment, Button, Header, Message } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, LoginData } from "../../redux/auth/actions";
import { AppState } from "../../redux";
import { AuthState } from "../../redux/auth/types";

export interface LoginProps {
  auth?: AuthState;
  errors?: any;
  loginUser: (userData: LoginData) => void;
  handleRegister: (page?: string) => void;
}
export interface LoginState {
  email: string;
  password: string;
  errors: any;
}
const Login: React.FC<LoginProps> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>();
  const { auth, loginUser, errors: errorsFromProps, handleRegister } = props;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // @ts-ignore
    let { from } = location.state || { from: { pathname: "/home" } };
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (auth?.isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [auth]);

  useEffect(() => {
    setErrors(errorsFromProps);
  }, [errorsFromProps]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    loginUser(userData);
  };

  return (
    <div>
      <Header as="h2" color="teal" textAlign="center">
        Log-in to your account
      </Header>
      <Form size="large" onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input
            error={
              errors?.emailnotfound
                ? { content: errors.emailnotfound, pointing: "below" }
                : null
            }
            value={email}
            id="email"
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <Form.Input
            error={
              errors?.passwordincorrect
                ? { content: errors.passwordincorrect, pointing: "below" }
                : null
            }
            value={password}
            id="password"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button color="teal" fluid size="large" type="submit">
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us?{" "}
        <a onClick={() => handleRegister("register")} href="#">
          Register
        </a>
      </Message>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
