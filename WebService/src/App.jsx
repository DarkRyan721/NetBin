import React from "react";
import "./App.css"; // Estilo CSS general de la pagina web
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Libreria para el cambiar entre paginas del DOM
import LoginPage from "./pages/login"; // Pagina Inicio de sesion
import WelcomePage from "./pages/welcome"; // Pagina de Bienvenida
import HomePage from "./pages/home";

/*
  Router: es el elemento que encapsula toda la aplicacion web y permite navegar entre sus paginas.
  Routes: Contiene todas las rutas de la aplicación, cada una de ellas con un path o identificador y el componente que la contiene.
  Route: Define cada ruta individual por ejemplo "/" para el WelcomePage.
*/

export default function App() 
{
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}