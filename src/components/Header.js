import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header({ email, isWrapped}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />

    </header>
  );
}
export default Header;
