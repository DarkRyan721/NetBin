import React, {useRef} from "react";
import { Button } from "@nextui-org/react"; // Importacion del componente Button para su uso.
import "./welcome.css"; // CSS para welcome.jsx
import {UserIcon} from '../components/UserIcon'; // Importacion del diseño del simbolo de usuario para los botones de registro e ingreso.
import { LetterNetBin, LogoNetBin } from "../components/Logo_NetBin"; // Importacion del logo y nombres de la empresa.
import { Link } from 'react-router-dom'; // Importacion de Link, componente que permite cambiar de pagina web.
import Cookies from "js-cookie"; // Libreria para el manejo de Cookies.
import {motion} from "framer-motion";
import {ArcticonsOpenaiChatgpt} from "../components/ChatGpt_Icon";
import {EpMoney} from "../components/Rewards_Icon";
import {GravityUiTrashBin} from "../components/Bin_Icon";

export default function WelcomePage()
{
   // Referencia al div Information-Container
  const informationRef = useRef(null);

  // Funcion para generar el desplazamiento que ejecuta el boton "Nuestro Producto"
  const scrollToInformation = () => 
  {
    if (informationRef.current) {
      informationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Accedemos/buscamos el token que permite adquirir las cookies.
  const token = Cookies.get('token');

  if(token)// Usuario ya previamente autenticado(No es necesario hacer de nuevo el logeo).
  {
    console.log('Usuario autenticado con token:', token);
  } 
  else// Usuario no autenticado previamente.
  {
    console.log('Usuario no autenticado');
  }

  /*
    Welcome-Background: es el Div encargado de cargar la imagen y por medio de ::after se aplica la capa de opacidad sobre esta.
    Welcom-Bar: es el Div que contendra todo los elementos de la barra principal(Logo, Nombre de la empresa, Iniciar sesion...).

      Logo-NetBin: es un Div que permitira desplegar el logo y nombre de la compañia en la barra principal.
        LogoNetBin: es el elemento recuperado de la carpeta components del proyecto que contiene el logo de la empresa.
        LetterNetBin: es un elemento extraido de la carpeta components el cual contiene el nombre de NetBin.
      
      Button-Container: es el div que contendra los diferentes botones de la barra principal. Aquellos elementos encerrados en los componentes
      Links son aquellos que desviaran al usuario a otras paginas.
        SignUp-Button: es el boton que llevara al SignUpPage o mejor dicho, encargado del registro de usuarios.
        LogIn-Button: es el boton encargado de llevar a los empresarios a su pagina(AdminPage).

    Welcome-Container: es el div restante de WelcomePage, encargado de contener la informacion del producto.

      Company-Phrase: es la frase motivacional de la compañia, basada en la campaña de 3R.
      Initial-Phrase: es la frase de calidad de la compañia.
      Product-Button: es el boton que re-dirige a la informacion de la caneca NetBin(AUN PENDIENTE).

  */

  return(
    <div className="WelcomePage-Container">
      <div className="Welcome-Background">
        <div className="Welcome-Bar">
            <div className="NetBin-Logo-Container">
              <LogoNetBin className="Logo-NetBin"/>
              <LetterNetBin className="Letter-NetBin"/>
            </div>
            <div className="Button-Container">
              <Link to="/signup">
                <Button className="SignUp-Button text-white bg-transparent border-0 border-transparent px-4 py-2 text-lg font-bold hover:text-black transition" startContent={<UserIcon/>} Link to="/about">
                    Registrarse
                </Button>
              </Link>
              <Link to="/login">
                <Button className="LogIn-Button text-white bg-transparent border-0 border-transparent px-4 py-2 text-lg font-bold hover:text-black transition" endContent={<UserIcon/>}>
                  Ingresar
                </Button>
              </Link>
            </div>
        </div>

        <div className="Welcome-Container">
            <h1 className="Company-Phrase">Reduce, Reusa y Recicla</h1>
            <h1 className="Initial-Phrase">ASEGURAMOS El CORRECTO{"\n"}RECICLAJE.</h1>
            <button class="Product-Button" onClick={scrollToInformation}>
              <GravityUiTrashBin className="Bin-On-Button" width="20" height="20"/>
              <span class="Text-On-Button">Nuestro Producto</span>
            </button>
        </div>
      </div>
      
      <div className="Information-Container" ref={informationRef}>
        <div className="Information-About-NetBin">
          <h1 className="Information-Title-About-NetBin"> 
            Sobre NetBin
          </h1>
          <p className="Information-Text-About-NetBin">
            NetBin es una caneca de basura inteligente e innovadora encargada de la gestión de residuos que utiliza tecnología de vanguardia como 
            inteligencia artificial, IoT, reconocimiento de voz y NFC para ayudar a los usuarios a clasificar 
            correctamente su basura.
          </p>
        </div>

        <div className="Product-Description-Container">
          <motion.div className="Product-AI" whileHover={{ scale: 1.1 }}>
            <ArcticonsOpenaiChatgpt width="50" height="50"/>
            <p className="Product-Text">
              Usando la tecnologia de ChatGpt y el reconocimiento de voz NetBin adquiere la capacidad de escucharte,
              comprenderte y actuar. Apoyado por IA podras clasificar correctamente la basura.
            </p>
          </motion.div>

          <motion.div className="Product-Rewards" whileHover={{ scale: 1.1 }}>
            <EpMoney width="50" height="50" color = "black"/>
            <p className="Product-Text">
              Integrado con NFC, cada una de nuestras canecas tiene la capacidad de reconocerte. 
              Esto nos permitira recompensarte con CoBins por tu compromiso con el medio ambiente.
            </p>
          </motion.div>

          <motion.div className="Product-Focus" whileHover={{ scale: 1.1 }}>
            <GravityUiTrashBin width="50" height="50" color = "black"/>
            <p className="Product-Text">
              NetBin se preocupa por el medio ambiente y la sostenibilidad. Este producto esta pensado
              para continuar con la responsabilidad ambiental, no solo incentiva sino lo mas importante, enseña.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}