import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Segment, Button, Header, Message } from "semantic-ui-react";
import { registerUser, RegisterData } from "../../redux/auth/actions";
import { AppState } from "../../redux";
import { AuthState } from "../../redux/auth/types";

export interface RegisterProps {
  auth?: AuthState;
  errors?: any;
  registerUser: (userData: RegisterData, history: any) => void;
  handleRegister: (page?: string) => any;
}
const Register: React.FC<RegisterProps> = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<any>();
  const { auth, errors: errorsFromProps, registerUser, handleRegister } = props;
  const navigate = useNavigate();

  useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (auth?.isAuthenticated) {
      navigate("/home");
    }
  }, [auth]);

  useEffect(() => {
    setErrors(errorsFromProps);
  }, [errorsFromProps]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = {
      firstname,
      lastname,
      email,
      password,
      password2,
    };
    registerUser(newUser, navigate);
  };

  return (
    <div>
      <Header as="h2" color="teal" textAlign="center">
        Register to use the platform
      </Header>
      <Form size="large" onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input
            error={
              errors?.email
                ? { content: errors.email, pointing: "below" }
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
            value={firstname}
            id="firstname"
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Firstname"
            onChange={(event) => setFirstname(event.target.value)}
          />
          <Form.Input
            value={lastname}
            id="lastname"
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Lastname"
            onChange={(event) => setLastname(event.target.value)}
          />
          <Form.Input
            error={
              errors?.password
                ? { content: errors.password, pointing: "below" }
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
          <Form.Input
            error={
              errors?.password2
                ? { content: errors.password2, pointing: "below" }
                : null
            }
            value={password2}
            id="password2"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Repeat password"
            type="password"
            onChange={(event) => setPassword2(event.target.value)}
          />
          <Button color="teal" fluid size="large" type="submit">
            Register
          </Button>
        </Segment>
      </Form>
      <Message>
        Already have an account?{" "}
        <a onClick={() => handleRegister("register")} href="#">
          Login
        </a>
      </Message>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(Register);
