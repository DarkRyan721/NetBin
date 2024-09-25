import React, {useState} from "react";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import "./login.css";
import { useNavigate } from 'react-router-dom'; // Componente para poder cambiar de pagina en un momento especifico.



export default function LoginPage() 
{
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const LoginFunction = async() =>
  {
    navigate('/home');
  };

  return (
    <div className="Login-Background">
      <div className="Login-Container">
        <h1 className="Login-Title">¡BIENVENIDO!</h1>
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

        <Button className="Save-Button text-white bg-transparent border border-transparent px-4 py-2 text-lg font-bold hover:border-white transition m-4" onClick={LoginFunction}>
            Guardar
        </Button>
      </div>
        {/* <div className="SignUp-Container">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                onClear={() => setName('')}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onClear={() => setLastName('')}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onClear={() => setEmail('')}
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
        </div> */}
    </div>
  );
}