import React, {useState} from "react";
import { Button, Input } from "@nextui-org/react"; // Importando los componentes Button e Input de React.
import "./signup.css"; // Estilo CSS para SignUpPage.jsx
import {EyeFilledIcon} from "./EyeFilledIcon"; // Componente grafico para la opcion de ocultar la contraseña.
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon"; // Componente grafico para la opcion de ocultar la contraseña.
import Cookies from "js-cookie"; // Libreria para el manejo de Cookies.
import { useNavigate } from 'react-router-dom'; // Componente para poder cambiar de pagina en un momento especifico.
import { motion } from 'framer-motion'; // Libreria que permite la animacion de objetos.

export default function SignUpPage()
{
    // Componente que permitira cambiar de pagina previamente enrutada con un Route en App.jsx
    const navigate = useNavigate();

    // Bandera que permitiran activar una animacion en un momento especifico.
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
    const RegisterFunction = async() =>
    {
        try
        {
            // Se crea un plain object que contenga la informacion del usuario suministrada en los Inputs.
            const userData = {username, password, firstname, secondname};

            console.log("Datos enviados:", JSON.stringify(userData));

            // Elemento que almacenara la respuesta de la solicitud POST hecha con la funcion fetch().
            const response = await fetch('https://netbin.onrender.com/auth/register',
                {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(userData)}
            );

            // Verifica si la respuesta del servidor BackEnd fue negativa para cortar el flujo y arrojar el error.
            if(!response.ok)
            {
                throw new Error("Error en el registro.");
            }

            // Se convierten y extraen los datos recibidos del servidor BackEnd para usarlo en las cookies.
            const data = await response.json();

            // **SE IMPRIMEN LOS DATOS MOMENTANEAMENTE PARA SU REVISION. BORRARLO**.
            console.log(data)

            // Se establecen las cookies en el sistema.
            Cookies.set('token', data.token, { expires: 7, secure: true });

            // Se establece el mensaje de un correcto registro para el usuario.
            setMessage('Registro exitoso');
            
            // Se activa la bandera que permite una animacion.
            setShowSuccess(true);

            // Después de 2 segundos de la animación, se re-dirige al WelcomePage
            setTimeout(() => {navigate('/');}, 2000);
        }
        catch(error)
        {
            // Se establece un mensaje de error en caso tal de que la comunicacion con el BackEnd haya fallado.
            setMessage("No se pudo lograr el registo. "+ error.message);
        }
    };

    /*
        SignUp-Background: es el Div encargado de cargar la imagen y usando ::after se aplica la capa de opacidad sobre esta.
        SignUp-Container: es un Div encargado de contener los Inputs, Buttons y Headers necesarios para la SignUpPage.
            
            SignUp-Title: es el Header "titulo" del Div en el cual se haya contenido.
            Name-Input: es el Input que permitira el ingreso del nombre del usuario.
            LastName-Input: es el Input que permitira el ingreso del apellido del usuario.
            Email-Input: es el Input que permitira el ingreso del correo electronico del usuario.
            Password-Input: es el Input que permitira el ingreso de la contraseña del usuario, permitiendo verificar que esta cumpla
            con los parametros y sea visible o no.

            Success-Message: es un Div animado por FramerMotion que mostrara un mensaje que indica el correcto registro de la cuenta.

            Save-Button: es el boton que permite activar la funcion RegisterFunction() y por ende, enviar el formulario de registro.
    */

    return(
        <div className="SignUp-Background">
            <div className="SignUp-Container">
                <h1 className="SignUp-Title">Crear Cuenta</h1>
                <Input
                    isClearable
                    label="Nombre"
                    variant="underlined"
                    className="Name-Input max-w-xs mb-4"
                    classNames={{
                        label:"custom-label-input"
                    }}
                    style={{
                        color: '#ffffff', // Color personalizado para el texto
                        fontWeight: 400,
                    }}
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    onClear={() => setFirstName('')}
                />
                <Input
                    isClearable
                    label="Apellido"
                    variant="underlined"
                    className="LastName-Input max-w-xs mb-4"
                    classNames={{
                        label:"custom-label-input"
                    }}
                    style={{
                        color: '#ffffff', // Color personalizado para el texto
                        fontWeight: 400,
                    }}
                    value={secondname}
                    onChange={(e) => setSecondName(e.target.value)}
                    onClear={() => setSecondName('')}
                />
                <Input
                    isClearable
                    label="Correo"
                    variant="underlined"
                    className="Email-Input max-w-xs mb-4"
                    classNames={{
                        label:"custom-label-input"
                    }}
                    style={{
                        color: '#ffffff', // Color personalizado para el texto
                        fontWeight: 400,
                    }}
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    onClear={() => setUserName('')}
                />

                <Input
                    label="Contraseña"
                    variant="underlined"
                    className="Password-Input max-w-xs mb-4"
                    classNames={{
                        label:"custom-label-input"
                    }}
                    style={{
                        color: '#ffffff', // Color personalizado para el texto
                        fontWeight: 400,
                    }}
                    // color="success"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
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

                {showSuccess && 
                    (<motion.div
                        initial={{ opacity: 0, scale: 0.7, backgroundPosition: '0% 100%' }}
                        animate={{
                            opacity: 1,
                            scale: 0.9,
                            backgroundPosition: '100% 100%',  // El gradiente se moverá de izquierda a derecha
                        }}
                        transition={{
                            duration: 2,  // Duración total de la animación
                            ease: 'easeInOut',
                        }}
                        style={{
                            padding: '20px',
                            borderRadius: '10px',
                            border: '4px solid transparent',  // Borde transparente para no interferir
                            background: 'linear-gradient(90deg, transparent 45%, #d0d3d4 50%, transparent 55%) no-repeat',  // Gradiente ajustado para una línea verde más delgada
                            backgroundSize: '200% 5%',
                        }}
                        className="Success-Message"
                    >
                        <h2>¡{message}!</h2>
                    </motion.div>)
                }

                <Button className="Save-Button text-white bg-transparent border border-transparent px-4 py-2 text-lg font-bold hover:border-white transition m-4" onClick={RegisterFunction}>
                    Guardar
                </Button>
            </div>
        </div>
    );
}