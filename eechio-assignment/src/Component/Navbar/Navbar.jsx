import React from "react";
import "./Navbar.css";
import { AiFillBell } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";

function Navbar() {
  return (
    <div className="header">
      <div>
        <img
          className="logo"
          src="https://echio.in/assets/images/logo.png"
          alt=""
        />
      </div>
      <div className="titles">
        <button className="hometitle">Home</button>
        <button className="campaign">My campaign</button>
      </div>
      <div className="accountdiv">
        <p className="bell">
          <AiFillBell />
        </p>
        <p className="account">
          <MdAccountCircle />
        </p>
      </div>
    </div>
  );
}

export default Navbar;
