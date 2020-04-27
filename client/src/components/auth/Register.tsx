import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser, RegisterData } from "../../redux/auth/actions";
import { AppState } from "../../redux";

export interface RegisterProps {
  auth?: any;
  history?: any;
  errors?: any;
  registerUser: (userData: RegisterData, history: any) => void;
}
export interface RegisterState {
  firstname: string;
  lastname?: string;
  email: string;
  password: string;
  password2: string;
  errors: any;
}
class Register extends React.Component<RegisterProps, RegisterState> {
  state: RegisterState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  };

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps: RegisterProps) {
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

    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Link to="/">Back to home</Link>
        <div>
          <h4>
            <b>Register</b> below
          </h4>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="firstname">Firstname</label>
            <input
              onChange={this.onChange}
              value={this.state.firstname}
              id="firstname"
              type="text"
            />
            <label htmlFor="lastname">Lastname</label>
            <input
              onChange={this.onChange}
              value={this.state.lastname}
              id="lastname"
              type="text"
            />
            <span>{errors.name}</span>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={this.onChange}
              value={this.state.email}
              id="email"
              type="email"
            />
            <span>{errors.email}</span>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={this.onChange}
              value={this.state.password}
              id="password"
              type="password"
            />
            <span>{errors.password}</span>
          </div>
          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input
              onChange={this.onChange}
              value={this.state.password2}
              id="password2"
              type="password"
            />
            <span>{errors.password2}</span>
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
              Sign up
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

// TODO: Fix typing for registerUser method
// @ts-ignore
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
