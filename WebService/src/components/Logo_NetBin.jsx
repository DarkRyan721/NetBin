// src/components/Logo_NetBin.jsx
import React from 'react';
import {ReactSVG}  from 'react-svg';
import logoURL from "../assets/NetBin_Logo.svg";
import letterURL from "../assets/NetBin_Letters.svg";

const LogoNetBin = () => {
  return (
    <img src={logoURL} style={{height:"100%", width:"100%"}} id='logo-netbin'/>
  );
};

const LetterNetBin = () => {
  return (
    <img src={letterURL} style={{height:"100%", width:"100%"}} id='letters-netbin'/>
  );
};

export { LogoNetBin, LetterNetBin };
