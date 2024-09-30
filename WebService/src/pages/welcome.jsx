import React, { useRef, useState } from "react";
import "./welcome.css"; // CSS para welcome.jsx
import { Button, Input } from "@nextui-org/react"; // Importacion del componente Button e Input para la pagina web.
import { UserIcon } from "../components/UserIcon"; // Importacion del diseño del simbolo de usuario para los botones de registro e ingreso.
import { LetterNetBin, LogoNetBin } from "../components/Logo_NetBin"; // logo y nombres de la empresa
import {ArcticonsOpenaiChatgpt} from "../components/ChatGpt_Icon"; // Logo ChatGpt
import {EpMoney} from "../components/Rewards_Icon"; // Icono de billetes
import {GravityUiTrashBin} from "../components/Bin_Icon"; // Icono de caneca de basura
import {MdiCloseOutline} from "../components/Close_Icon"; // Icono de X(Usado para cerrar el Pop-Up).
import {FluentEmojiHighContrastThinkingFace} from "../components/Thinking_Icon.jsx";
import { EyeFilledIcon } from "../components/EyeFilledIcon"; // Componente grafico para la opcion de ocultar la contraseña.
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon"; // Componente grafico para la opcion de ocultar la contraseña.
import { Link } from "react-router-dom"; // Importacion de Link, componente que permite cambiar de pagina web.
import { motion } from "framer-motion"; // Importacion de motion, herramienta para generar animaciones.

export default function WelcomePage() 
{
  // Referencia al div:features-Container
  const featuresRef = useRef(null);
  const informationRef = useRef(null);
  const instructionRef = useRef(null);
  const welcomeRef = useRef(null);

  // Funcion para generar el desplazamiento que ejecuta el Button:Product-Button
  const scrollToInformation = () => 
  {
    if (informationRef.current) {
      informationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFeatures = () =>
  {
    if(featuresRef.current)
    {
      featuresRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  const scrollToInstruction = () =>
  {
    if(instructionRef.current)
    {
      instructionRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  const scrollToWelcome = () =>
    {
      if(welcomeRef.current)
      {
        welcomeRef.current.scrollIntoView({behavior: 'smooth'});
        togglePopUp();
      }
    };

  // Elementos creados para abrir/cerrar la ventana emergente(Pop-Up) de registro
  const [isOpen, setIsOpen] = useState(false);

  // Funcion que alterna el estado de la ventana Pop-up(oculto/visible)
  const togglePopUp = () => setIsOpen(!isOpen);

  // Elementos creados para activar/desactivar la animacion del mensaje relacionado al registro
  const [showSuccess, setShowSuccess] = useState(false);

  //________________________________________________________________________________________________
  // Lista de variables que el usuario registrara en la base de datos para la creacion de su cuenta.

  const [firstname, setFirstName] = useState("");
  const [secondname, setSecondName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //________________________________________________________________________________________________

  // Variable que permite el intercambio de mensajes entre el BackEnd y el FrontEnd.
  const [message, setMessage] = useState("");

  //_____________________________________________________________________________________________________________________________
  // Variables y funcion necesarias para ocultar o dejar visible la contraseña(Recuperada de la documentacion oficial de NextUI).

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  //_____________________________________________________________________________________________________________________________

  // Funcion encargada del registro de usuarios y la comunicacion con el servidor BackEnd.
  const RegisterFunction = async () =>
  {
    try
    {
      // Se crea un plain object que contenga la informacion del usuario suministrada en los Inputs.
      const userData = { username, password, firstname, secondname };

      console.log("Datos enviados:", JSON.stringify(userData));

      // Elemento que almacenara la respuesta de la solicitud POST hecha con la funcion fetch().
      const response = await fetch(
        "https://netbin.onrender.com/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      // Verifica si la respuesta del servidor BackEnd fue negativa para cortar el flujo y arrojar el error.
      if(!response.ok)
      {
        throw new Error("Error en el registro.");
      }

      // Se establece el mensaje de un correcto registro para el usuario.
      setMessage("Registro exitoso");

      // Se activa la bandera que permite una animacion.
      setShowSuccess(true);

      //Después de 2 segundos de la animación, se re-dirige al WelcomePage
      setTimeout(() =>
      {
        // Se reinicia el estado de las variables para un nuevo registro.
        setShowSuccess(false);
        setUserName("");
        setFirstName("");
        setSecondName("");
        setPassword("");

        // Se desactiva la ventana Pop-Up
        togglePopUp();
      }, 2000);
    }
    catch (error)
    {
      // Se establece un mensaje en caso de error.
      setMessage("El registro ha fallado");
    }
  };

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

  return (
    <div className="WelcomePage-Container">
      <div className="Welcome-Background" ref={welcomeRef}>
        <div className="Welcome-Bar">
            <div className="NetBin-Logo-Container">
              <LogoNetBin className="Logo-NetBin"/>
              <LetterNetBin className="Letter-NetBin"/>
            </div>
            <div className="Button-Container">

                <Button type="button" className="SignUp-Button text-white bg-transparent border-0 border-transparent px-4 py-2 text-lg font-bold hover:text-black transition" startContent={<UserIcon className="User-Icon"/>} onClick={togglePopUp}>
                    Registrarse
                </Button>
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
            <button class="Welcome-Container-Button" onClick={scrollToInformation}>
              <GravityUiTrashBin className="Icon-WC-Button" width="20" height="20"/>
              <span class="Text-WC-Button">Nuestro Producto</span>
            </button>
            <button class="Welcome-Container-Button" onClick={scrollToInstruction}>
              <FluentEmojiHighContrastThinkingFace className="Icon-WC-Button" width="20" height="20"/>
              <span class="Text-WC-Button">¿Como usar NetBin?</span>
            </button>
        </div>

        {isOpen && (
          <div className="SignUp-Back">
            <div className="SignUp-Container">
              {/* From Uiverse.io by vinodjangid07 */}
              <button type="button" class="Close-PopUp-Button" onClick={togglePopUp}>
                <MdiCloseOutline className="svgIcon"/>
              </button>
              <h1 className="SignUp-Title">Crear Cuenta</h1>
              <Input
                isClearable
                label="Nombre"
                variant="underlined"
                className="Name-Input max-w-xs mb-4"
                classNames={{
                  label: "custom-label-input",
                }}
                style={{
                  color: "#ffffff",
                  fontWeight: 400,
                }}
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                onClear={() => setFirstName("")}
              />
              <Input
                isClearable
                label="Apellido"
                variant="underlined"
                className="LastName-Input max-w-xs mb-4"
                classNames={{
                  label: "custom-label-input",
                }}
                style={{
                  color: "#ffffff", // Color personalizado para el texto
                  fontWeight: 400,
                }}
                value={secondname}
                onChange={(e) => setSecondName(e.target.value)}
                onClear={() => setSecondName("")}
              />
              <Input
                isClearable
                label="Correo"
                variant="underlined"
                className="Email-Input max-w-xs mb-4"
                classNames={{
                  label: "custom-label-input",
                }}
                style={{
                  color: "#ffffff", // Color personalizado para el texto
                  fontWeight: 400,
                }}
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                onClear={() => setUserName("")}
              />

              <Input
                label="Contraseña"
                variant="underlined"
                className="Password-Input max-w-xs mb-4"
                classNames={{
                  label: "custom-label-input",
                }}
                style={{
                  color: "#ffffff", // Color personalizado para el texto
                  fontWeight: 400,
                }}
                // color="success"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showSuccess && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    backgroundPosition: "0% 100%",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 0.9,
                    backgroundPosition: "100% 100%", // El gradiente se moverá de izquierda a derecha
                  }}
                  transition={{
                    duration: 2, // Duración total de la animación
                    ease: "easeInOut",
                  }}
                  style={{
                    padding: "20px",
                    borderRadius: "10px",
                    border: "4px solid transparent", // Borde transparente para no interferir
                    background:
                      "linear-gradient(90deg, transparent 45%, #d0d3d4 50%, transparent 55%) no-repeat", // Gradiente ajustado para una línea verde más delgada
                    backgroundSize: "200% 5%",
                  }}
                  className="Success-Message"
                >
                  <h2>¡{message}!</h2>
                </motion.div>
              )}
              <button type="button" class="PopUp-Send-Button" data-text="Awesome" onClick={RegisterFunction}>
                <span class="actual-text">&nbsp;Enviar&nbsp;</span>
                <span aria-hidden="true" class="hover-text">
                  &nbsp;Enviar&nbsp;
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="Information-Container" ref={informationRef}>
        <div className="Information-About-NetBin">
          {/* From Uiverse.io by alexruix */}
          <div class="card">
            <div class="card-info">
              <h1 class="title">
                NETBIN
              </h1>
              <p className="Text">
                NetBin es una caneca inteligente diseñada para guiar a las personas en la correcta clasificación de los residuos de basura.
                A través de la inteligencia artificial, NetBin te ayudará si no estás seguro a que categoria corresponde lo que deseas desechar.
                Además de contribuir al cuidado del medio ambiente, serás recompensado con CoBins, nuestra moneda
                virtual. Estas CoBins pueden ser canjeadas en nuestras empresas aliadas, comprometidas con la responsabilidad ambiental,
                como una forma de agradecer tu participación y esfuerzo en el reciclaje responsable.
                ¡Juntos podemos hacer una gran diferencia para el planeta!
              </p>
            </div>
          </div>

          <button class="Information-Button" onClick={scrollToFeatures}>
            ¡Quiero saber mas!
          </button>
        </div>

        <div className="Image-Container">
          <div className="Image-NetBin">

          </div>
        </div>
      </div>

      <div className="features-Container" ref={featuresRef}>
        <div className="features-About-NetBin">
          <h1 className="features-Title-About-NetBin">
            Sobre NetBin
          </h1>
          <p className="features-Text-About-NetBin">
            NetBin es una propuesta innovadora encargada de la gestión de residuos que utiliza tecnología de vanguardia como
            inteligencia artificial, IoT, reconocimiento de voz y NFC para ayudar a los usuarios a clasificar
            correctamente su basura. NetBin se rige en tres aspectos fundamentales para su funcionamiento:
          </p>
        </div>

        <div className="Product-Description-Container">
          <motion.div className="Product-AI" whileHover={{ scale: 1.1 }}>
            <ArcticonsOpenaiChatgpt width="50" height="50" />
            <p className="Product-Text">
              Usando la tecnologia de ChatGpt y el reconocimiento de voz NetBin, adquiere la capacidad de escucharte,
              comprenderte y actuar por ti. Apoyado por IA podras clasificar correctamente la basura.
            </p>
          </motion.div>

          <motion.div className="Product-Rewards" whileHover={{ scale: 1.1 }}>
            <EpMoney width="50" height="50" color="black" />
            <p className="Product-Text">
              Integrado con NFC, cada una de nuestras canecas tiene la capacidad de reconocerte.
              Esto nos permitira a nosotros y las compañias aliadas, recompensarte con CoBins y productos por tu compromiso con el medio ambiente.
            </p>
          </motion.div>

          <motion.div className="Product-Focus" whileHover={{ scale: 1.1 }}>
            <GravityUiTrashBin width="50" height="50" color="black" />
            <p className="Product-Text">
              NetBin se preocupa por el medio ambiente y la sostenibilidad. Este
              producto esta pensado para continuar con la responsabilidad
              ambiental, no solo incentiva sino lo mas importante, enseña.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="Instruction-Container" ref={instructionRef}>
        <div className="Register-Option-Container">
          <h1 className="Register-Option-Title">
            ¡Usa una de nuestras canecas!
          </h1>
          <p className="Register-Option-Text">
            Si quieres utilizar una de nuestras canecas y ganar CoBins, puedes
            registrarte ahora mismo, descargar nuestra aplicacion en tu celular y usar el NFC que
            este dispone &#x1f60a;.
          </p>
          {/* From Uiverse.io by cssbuttons-io */ }
          <button className="Register-Option-Button" onClick={scrollToWelcome}>
            <span class="text">Registrate</span>
          </button>
        </div>

        <div className="User1-Container">
          <div className="User-Icon-Container">
            <GravityUiTrashBin width="50" height="50" color="#00eb18" />
          </div>
          <div className="User-Information-Container">
            <h1 className="User-IC-Title">
              ¿Ya sabes donde botar tu basura?
            </h1>
            <ol className="User-Ic-Text">
              <li>1] Acércate a una de nuestras canecas</li>
              <li>2] Aproxima tu residuo de basura al compartimento correspondiente.</li>
              <li>3] Nuestro sensor de proximidad te detectará y podrás botar tu basura.</li>
            </ol>
          </div>
        </div>

        <div className="User2-Container">
          <div className="User-Icon-Container">
            <EpMoney width="50" height="50" color="#00eb18" />
          </div>
          <div className="User-Information-Container">
            <h1 className="User-IC-Title">
              ¿Quieres obtener CoBins por seccionar bien la basura?
            </h1>
            <ol className="User-Ic-Text">
              <li>1] Acércate a una de nuestras canecas</li>
              <li>2] Coloca tu celular en nuestro sensor NFC para verificar tu cuenta</li>
              <li>3] ¡Habla con nuestra IA! dile que residuo llevas contigo</li>
              <li>4] Se te abrira la seccion correspondiente y podras botar tu basura</li>
              <li>5] Revisa tu celular y mira cuantos CoBins ganaste</li>
            </ol>
          </div>
        </div>

        <div className="User3-Container">
          <div className="User-Icon-Container">
            <FluentEmojiHighContrastThinkingFace width="50" height="50" color="#00eb18" />
          </div>
          <div className="User-Information-Container">
            <h1 className="User-IC-Title">
              ¿Solo quieres saber donde botar tu basura?
            </h1>
            <ol className="User-Ic-Text">
              <li>1] Acércate a una de nuestras canecas</li>
              <li>2] Aproxima tu mano al microfono de la caneca para activarlo</li>
              <li>3] ¡Habla con nuestra IA! dile que residuo llevas contigo</li>
              <li>4] Se te abrira la seccion correspondiente y podras botar tu basura</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
