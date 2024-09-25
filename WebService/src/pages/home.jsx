import React from "react";
import {Input, Button } from "@nextui-org/react";
import "./home.css";
import {Avatar} from "@nextui-org/react";
import {CameraIcon} from '../components/CameraIcon';
import Bin from '../components/Bin'

const username = "Usuario"
const percent = "50%"
const coinBin = "5000"

export default function HomePage()
{
  return(
    <div className="home-container">
      <div className="menu-column">

        <div className="user-info flex gap-3">
          <Avatar showFallback src='...' className="w-12 h-12" fallback={
            <CameraIcon className="animate-pulse w-8 h-8 text-default-500" fill="currentColor" size={20} />
          }/>
          
          <h1 className="username">{username}</h1>
        </div>

        <h1 className="CoinBin">CoinBins: {coinBin}</h1>
        

      </div>
      <div className="bin-column">

        <h1 className="bin-column-title">BOTE DE BASURA</h1>

        <Bin/>

        <h1 className="bin-pecent">Porcentaje actual: {percent}</h1>
        
      </div>
      <div className="Benefits-column">

        <h1 className="Benefits-title">BENEFICIOS</h1>

        <div className="Query-IA">
          <h1 className="Last-waste">Ultimos Desechos</h1>
        </div>

        <div className="Benefits-list">

        </div>

      </div>
    </div>
  );
}