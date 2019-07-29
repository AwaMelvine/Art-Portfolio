import React, { Component } from "react";

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
  };
  render() {
    return (
      <div>
        <h2>Register</h2>
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
            <select name="role" onChange={this.change}>
              <option value="user">User</option>
              <option value="artist">Artist</option>
            </select>
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
