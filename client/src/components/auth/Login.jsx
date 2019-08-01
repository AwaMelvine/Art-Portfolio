import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { registerUser } from "../../store/actions/users";

const FormWrapper = styled.div`
  width: 30%;
  margin: 2rem auto;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  background: white;
  padding: 2rem;
  color: #555;
  font-family: "Lora", serif;

  h2 {
    text-align: center;
  }

  div {
    margin-bottom: 0.35rem;

    p {
      text-align: center;
      a {
        color: inherit;
        &:hover {
          color: #4880d6;
        }
      }
    }

    label {
      display: block;
    }

    input {
      width: 100%;
      font-size: 1.1rem;
      padding: 0.8rem 1rem;
      margin: 8px 0;
      font-family: "Lora", serif;
      color: #555;
      outline: none;
      border: 1px solid #e6e6e6;
      border-radius: 4px;

      &:focus {
        border: 1px solid #4880d6;
      }
    }
    select {
      height: 48px;
    }
    button[type="submit"] {
      background: #5858b7;
      color: white;
      border: none;
      text-align: center;
      display: inline-block;
      font-size: 1.2rem;
      font-family: "Lora", serif;
      margin: 4px 2px;
      padding: 0.8rem 1.2rem;
      width: 100%;
      cursor: pointer;
      border-radius: 4px;
      outline: none;
      &:hover {
        background: #3f3f8c;
      }
    }
  }
`;

class Register extends Component {
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
    this.props.registerUser(this.state.data);
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
  { registerUser }
)(Register);
