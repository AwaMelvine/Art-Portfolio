import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid green;
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
      height: 80%;
      width: auto;
    }
  }
`;

const NavMenu = styled.nav`
  border: 1px dashed red;
  display: flex;
  width: 300px;
  text-align: center;

  a {
    flex: 1;
    text-align: center;
    border: 1px solid red;
    display: block;
    padding: 1.2rem;
    text-decoration: none;
    color: inherit;

    &:hover {
      background: #ecf9fb;
      color: #00bcd4;
    }
  }
`;

const NavBar = () => {
  return (
    <StyledHeader>
      <NavWrapper>
        <div className="logo">
          <img src={require("../../assets/images/logo.png")} alt="Logo" />
        </div>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </NavMenu>
      </NavWrapper>
    </StyledHeader>
  );
};

export default NavBar;
