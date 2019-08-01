import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, setErrorMessages } from "../../store/actions/users";
import { FormWrapper } from "./_auth";

class Login extends Component {
  state = {
    data: {
      username: "",
      password: ""
    },
    message: ""
  };
  componentDidMount() {
    this.props.setErrorMessages(null);
  }
  change = e => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };
  submit = e => {
    e.preventDefault();
    this.props.setErrorMessages(null);
    this.props.loginUser(this.state.data).then(() => {
      if (!this.props.errors) {
        this.setState({
          ...this.state,
          message: "<b>Login Success:</b> Redirecting soon..."
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    });
  };
  render() {
    const { errors } = this.props;
    const { message } = this.state;

    return (
      <FormWrapper>
        <h2>Login</h2>
        <form method="post" onSubmit={this.submit}>
          {errors && (
            <ul className="msg error">
              {errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
          {message && (
            <ul className="msg success">
              <li>
                <div dangerouslySetInnerHTML={{ __html: message }} />
              </li>
            </ul>
          )}
          <div>
            <label>Username</label>
            <input type="text" name="username" onChange={this.change} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" onChange={this.change} />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          <div>
            <p>
              Or <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.users.errors
});

export default connect(
  mapStateToProps,
  { loginUser, setErrorMessages }
)(Login);
