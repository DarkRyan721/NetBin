import React from "react";
import '../styles/Bin.css';
import {motion} from "framer-motion"



export default function Bin()
{
    return(
        <div>
            <div className="Bin-container">
                <motion.div className="Bin" initial={{height: '0%'}} animate={{height: '50%' }} transition={{ duration: 1}}/>
                <motion.div
                    className="Bin"
                    animate={{
                    height: ["0%", "2%", "0%"], // Cambios de altura cíclicos
                    }}
                    transition={{
                    duration: 1.5,
                    repeat: Infinity, // Repite la animación infinitamente
                    ease: "easeInOut", // Suaviza la animación
                    repeatType: "loop", // La animación vuelve a empezar después de completarse
                    }}
                />
            </div>
            {/*<motion.div className="Bin" animate={{scale:2}}/>}*/}
        </div>
    )
}  
