import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  -webkit-box-shadow: -1px 3px 5px -4px rgba(0, 0, 0, 0.66);
  -moz-box-shadow: -1px 3px 5px -4px rgba(0, 0, 0, 0.66);
  box-shadow: -1px 3px 5px -4px rgba(0, 0, 0, 0.66);
`;

const NavWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;

  .logo {
    height: 67px;
    padding: 0px 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 60%;
      width: auto;
    }
  }
`;

const NavMenu = styled.nav`
  display: flex;
  width: 300px;
  text-align: center;

  & > a {
    flex: 1;
    text-align: center;
    display: block;
    padding: 1.3rem;
    text-decoration: none;
    color: #444;
    font-family: "Nunito", sans-serif;
    font-size: 1.15rem;
    transition: all 0.2s ease-out;
    position: relative;

    &:hover {
      background: #ecf9fb;
      color: #00bcd4;
      transition: all 0.2s ease-in;

      .dropdown {
        opacity: 1;
        right: 0;
        left: 0;
        top: 66px;
        background: white;
        transition: all 0.2s ease-in;
      }
    }

    .dropdown {
      opacity: 0;
      position: absolute;
      right: 0;
      left: 0;
      top: 70px;
      list-style: none;
      margin: 0px;
      padding: 0px;
      transition: all 0.2s ease-out;

      span {
        display: block;
        min-width: 100%;
        text-align: left;
        text-decoration: none;
        color: #444;
        font-size: 1rem;
        padding: 0.6rem;
        border-left: 1px solid #e7e7e7;
        border-bottom: 1px solid #e7e7e7;
        border-right: 1px solid #e7e7e7;

        &.logout {
          color: red;
        }
        &:hover {
          background: #d8d7d7;
        }
      }
    }
  }
`;

class NavBar extends React.Component {
  logout = e => {
    localStorage.clear();
    window.location.href = "/";
  };
  render() {
    const token = localStorage.getItem("token");
    let authLinks = "";
    if (token) {
      authLinks = (
        <NavLink to="#">
          Awa
          <ul className="dropdown">
            <span to="/">My Profile</span>
            <span className="logout" onClick={this.logout}>
              logout
            </span>
          </ul>
        </NavLink>
      );
    } else {
      authLinks = (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      );
    }
    return (
      <StyledHeader>
        <NavWrapper>
          <div className="logo">
            <img src={require("../../assets/images/logo.png")} alt="Logo" />
          </div>
          <NavMenu>
            <NavLink to="/">Home</NavLink>
            {authLinks}
          </NavMenu>
        </NavWrapper>
      </StyledHeader>
    );
  }
}

export default NavBar;
