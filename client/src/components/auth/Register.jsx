import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser, setErrorMessages } from "../../store/actions/users";
import { FormWrapper } from "./_auth";

class Register extends Component {
  state = {
    data: {
      username: "",
      email: "",
      password: "",
      passwordConf: "",
      role: ""
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
    this.props.setErrorMessages(null);
    this.props.registerUser(this.state.data).then(() => {
      if (!this.props.errors) {
        this.props.history.push("/");
      }
    });
  };
  render() {
    const { errors } = this.props;
    return (
      <FormWrapper>
        <h2>Register</h2>
        {errors && (
          <ul className="errors">
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <form method="post" onSubmit={this.submit}>
          <div>
            <label>Username</label>
            <input type="text" name="username" onChange={this.change} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" onChange={this.change} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" onChange={this.change} />
          </div>
          <div>
            <label>Password Confirmation</label>
            <input type="password" name="passwordConf" onChange={this.change} />
          </div>
          <div>
            <label>Account Type</label>
            <select name="role" onChange={this.change} defaultValue="">
              <option value="" disabled>
                -- select --
              </option>
              <option value="user">User</option>
              <option value="artist">Artist</option>
            </select>
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
          <div>
            <p>
              Or <Link to="/login">Login</Link>
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
  { registerUser, setErrorMessages }
)(Register);
