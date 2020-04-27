import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, LoginData } from "../../redux/auth/actions";
import { AppState } from "../../redux";

export interface LoginProps {
  auth?: any;
  history?: any;
  errors?: any;
  loginUser: (userData: LoginData) => any;
}
export interface LoginState {
  email: string;
  password: string;
  errors: any;
}
class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    email: "",
    password: "",
    errors: {},
  };

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps: Partial<LoginProps>) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.id]: event.target.value } as any);
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Link to="/">Back to home</Link>
        <div>
          <h4>
            <b>Login</b> below
          </h4>
          <p className="grey-text text-darken-1">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <input
              onChange={this.onChange}
              value={this.state.email}
              id="email"
              type="email"
            />
            <label htmlFor="email">Email</label>
            <span>
              {errors.email}
              {errors.emailnotfound}
            </span>
          </div>
          <div>
            <input
              onChange={this.onChange}
              value={this.state.password}
              id="password"
              type="password"
            />
            <label htmlFor="password">Password</label>
            <span>
              {errors.password}
              {errors.passwordincorrect}
            </span>
          </div>
          <div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
