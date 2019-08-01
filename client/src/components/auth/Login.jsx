import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../store/actions/users";
import { FormWrapper } from "./_auth";

class Login extends Component {
  state = {
    data: {
      username: "",
      password: ""
    }
  };
  change = e => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };
  submit = e => {
    e.preventDefault();
    this.props.loginUser(this.state.data);
  };
  render() {
    return (
      <FormWrapper>
        <h2>Login</h2>
        <form method="post" onSubmit={this.submit}>
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

export default connect(
  null,
  { loginUser }
)(Login);
