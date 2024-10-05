// src/components/Logo_NetBin.jsx
import React from "react";
import { ReactSVG } from "react-svg";
import logoURL from "../assets/NetBin_Logo_WelcomePage.svg";
import letterURL from "../assets/NetBin_Letters_WelcomePage.svg";

const LogoNetBin = ({ className }) => {
  return (
    <img
      src={logoURL}
      className={className || "logo-netbin"}  // Default className if not provided
      alt="NetBin Logo"
    />
  );
};

const LetterNetBin = () => {
  return (
    <img
      src={letterURL}
      style={{ height: "100%", width: "100%" }}
      id="letters-netbin"
    />
  );
};

export { LogoNetBin, LetterNetBin };
