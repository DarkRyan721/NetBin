import React, { useRef, useState } from "react";
import "./welcome.css";
import {
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    TextField,
} from "@mui/material";
import { UserIcon } from "../components/UserIcon";
import { LetterNetBin, LogoNetBin } from "../components/Logo_NetBin";
import {
    SiOpenai as OpenAI,
    SiClaude as Claude,
    SiOllama as Ollama,
} from "react-icons/si";
import { PiCoins } from "react-icons/pi";
import { IoTerminal } from "react-icons/io5";
import { MdiCloseOutline } from "../components/Close_Icon";
import RegisterUiverseForm from "../components/RegisterUiverseForm";
import { Link } from "react-router-dom";
import heroImage from "../assets/Gemini_Generated_Image_hoi32mhoi32mhoi3.png";

export default function WelcomePage() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const informationRef = useRef(null);
    const featuresRef = useRef(null);
    const instructionRef = useRef(null);
    const welcomeRef = useRef(null);
    const contactUsRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [usernameError, setUserNameError] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");
    const [contactFileName, setContactFileName] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");
    const [contactStatusMessage, setContactStatusMessage] = useState("");

    const scrollTo = (ref) =>
        ref.current?.scrollIntoView({ behavior: "smooth" });
    const togglePopUp = () =>
        setIsOpen((prev) => {
            const next = !prev;
            if (next) {
                setRegisterMessage("");
                setShowSuccess(false);
            }
            return next;
        });

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setUserName(value);

        if (!emailRegex.test(value)) {
            setUserNameError("Correo no válido");
            setIsUsernameValid(false);
            return;
        }

        setUserNameError("");
        setIsUsernameValid(true);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        const hasMinLength = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        if (!hasMinLength || !hasUpperCase || !hasSymbol) {
            setPasswordError(
                "Mínimo 8 caracteres, una mayúscula y un símbolo.",
            );
            setIsPasswordValid(false);
            return;
        }

        setPasswordError("");
        setIsPasswordValid(true);

        if (confirmPassword && confirmPassword !== value) {
            setConfirmPasswordError("Las contraseñas no coinciden.");
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);

        if (value && value !== password) {
            setConfirmPasswordError("Las contraseñas no coinciden.");
            return;
        }

        setConfirmPasswordError("");
    };

    const RegisterForm = async () => {
        try {
            if (
                !isUsernameValid ||
                !isPasswordValid ||
                !firstname ||
                !lastname ||
                !confirmPassword
            ) {
                setRegisterMessage("Completa los campos correctamente.");
                return;
            }

            if (password !== confirmPassword) {
                setConfirmPasswordError("Las contraseñas no coinciden.");
                return;
            }

            const userData = { username, password, firstname, lastname };

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                },
            );

            if (!response.ok) {
                throw new Error("Error en el registro.");
            }

            setRegisterMessage("Registro exitoso");
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                setUserName("");
                setFirstName("");
                setLastname("");
                setPassword("");
                setConfirmPassword("");
                setUserNameError("");
                setPasswordError("");
                setConfirmPasswordError("");
                setIsUsernameValid(false);
                setIsPasswordValid(false);
                togglePopUp();
            }, 1800);
        } catch (error) {
            setRegisterMessage("El registro ha fallado");
        }
    };

    const ContactForm = () => {
        setContactStatusMessage(
            "¡Mensaje recibido! Pronto nos pondremos en contacto contigo.",
        );
        setContactName("");
        setContactEmail("");
        setContactMessage("");
        setContactFileName("");
    };

    const fieldProps = {
        variant: "outlined",
        fullWidth: true,
        className: "mui-field",
        size: "medium",
    };

    return (
        <div className="landing-page">
            <header className="landing-nav">
                <button
                    type="button"
                    className="uiverse-btn brand"
                    onClick={() => scrollTo(welcomeRef)}
                >
                    <LogoNetBin className="brand-logo" />
                    <div className="brand-letter-wrap">
                        <LetterNetBin />
                    </div>
                </button>

                <div className="nav-actions">
                    <button
                        type="button"
                        className="uiverse-btn nav-btn"
                        onClick={() => scrollTo(informationRef)}
                    >
                        Producto
                    </button>
                    <button
                        type="button"
                        className="uiverse-btn nav-btn"
                        onClick={() => scrollTo(featuresRef)}
                    >
                        Beneficios
                    </button>
                    <button
                        type="button"
                        className="uiverse-btn nav-btn"
                        onClick={() => scrollTo(instructionRef)}
                    >
                        Uso
                    </button>
                    <button
                        type="button"
                        className="uiverse-btn nav-btn"
                        onClick={() => scrollTo(contactUsRef)}
                    >
                        Contáctanos
                    </button>

                    <Button
                        className="uiverse-btn mui-btn cta-ghost"
                        onClick={togglePopUp}
                        startIcon={<UserIcon height="16" />}
                    >
                        Registrarse
                    </Button>

                    <Button
                        className="uiverse-btn mui-btn cta-primary"
                        component={Link}
                        to="/login"
                    >
                        Ingresar
                    </Button>
                </div>
            </header>

            <main>
                <section className="hero" ref={welcomeRef}>
                    <div className="hero-content">
                        <p className="hero-tag">
                            Sostenibilidad + IA + Recompensas
                        </p>
                        <h1>
                            Reciclaje inteligente con experiencia premium para
                            usuarios y empresas.
                        </h1>
                        <p>
                            NetBin moderniza la gestión de residuos con
                            clasificación guiada por IA, validación NFC y
                            métricas para impacto ambiental real.
                        </p>

                        <div className="hero-cta-row">
                            <Button
                                className="uiverse-btn mui-btn solid-btn"
                                onClick={() => scrollTo(informationRef)}
                            >
                                Conocer NetBin
                            </Button>
                            <Button
                                className="uiverse-btn mui-btn outline-btn"
                                onClick={() => scrollTo(instructionRef)}
                            >
                                ¿Cómo funciona?
                            </Button>
                        </div>

                        <div className="hero-metrics">
                            <div>
                                <strong>+90%</strong>
                                <span>de precisión en clasificación</span>
                            </div>
                            <div>
                                <strong>24/7</strong>
                                <span>disponibilidad operativa</span>
                            </div>
                            <div>
                                <strong>CoBins</strong>
                                <span>incentivos para reciclar mejor</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <img src={heroImage} alt="Caneca inteligente NetBin" />
                        <div className="floating-card">
                            <p>Clasificación asistida por IA</p>
                            <strong>
                                Reciclable / No reciclable en segundos
                            </strong>
                        </div>
                    </div>
                </section>

                <section className="info-section" ref={informationRef}>
                    <div className="section-heading">
                        <p>Producto</p>
                        <h2>
                            Producto con IA, IoT y recompensas en un solo flujo
                        </h2>
                    </div>

                    <div className="info-grid">
                        <article className="assistant-ai-card">
                            <div
                                className="ai-provider-logo-row"
                                aria-label="Logos de OpenAI, Claude y Ollama"
                            >
                                <OpenAI size={32} />
                                <Claude size={32} />
                                <Ollama size={32} />
                            </div>
                            <h3>Asistente IA (NLP + Voz)</h3>
                            <p>
                                Modelos integrables como GPT-4o mini / Llama 3.1
                                para guía conversacional y Whisper para
                                transcripción de voz en tiempo real.
                            </p>
                        </article>
                        <article>
                            <PiCoins size={32} style={{ color: "#333333" }} />
                            <h3>CoBins</h3>
                            <p>
                                Puntos digitales que se otorgan por
                                clasificación correcta y pueden canjearse por
                                beneficios, campañas o programas de fidelización
                                ambiental.
                            </p>
                        </article>
                        <article>
                            <IoTerminal size={32}  style={{ color: "#333333" }}/>
                            <h3>IoT + Telemetría</h3>
                            <p>
                                Sensores de nivel/uso y eventos enviados por
                                MQTT para monitoreo en dashboard, alertas
                                operativas y trazabilidad de rendimiento.
                            </p>
                        </article>
                    </div>
                </section>

                <section className="features-section" ref={featuresRef}>
                    <div className="section-heading">
                        <p>Beneficios</p>
                        <h2>Beneficios concretos para operación y adopción</h2>
                    </div>

                    <div className="feature-cards">
                        <article>
                            <h3>Usuarios finales</h3>
                            <p>
                                Clasifican mejor en segundos, reciben
                                retroalimentación inmediata y acumulan CoBins.
                            </p>
                        </article>
                        <article>
                            <h3>Operación y mantenimiento</h3>
                            <p>
                                Alertas por llenado, seguimiento por nodo y
                                menor tiempo de respuesta en campo.
                            </p>
                        </article>
                        <article>
                            <h3>Gestión ambiental</h3>
                            <p>
                                Datos trazables para reportes ESG, indicadores
                                de reciclaje y decisiones de expansión.
                            </p>
                        </article>
                    </div>
                </section>

                <section className="instructions" ref={instructionRef}>
                    <div className="section-heading">
                        <p>Experiencia</p>
                        <h2>Uso en 3 pasos claros</h2>
                    </div>

                    <div className="steps-grid">
                        <article>
                            <span>01</span>
                            <h3>Identificación</h3>
                            <p>
                                El usuario se acerca y, si aplica, valida su
                                cuenta por NFC para asociar recompensas.
                            </p>
                        </article>
                        <article>
                            <span>02</span>
                            <h3>Clasificación asistida</h3>
                            <p>
                                La IA interpreta voz/texto y sugiere categoría
                                para abrir el compartimento correcto.
                            </p>
                        </article>
                        <article>
                            <span>03</span>
                            <h3>Registro y recompensa</h3>
                            <p>
                                El evento se registra en IoT y el usuario recibe
                                CoBins si realizó una disposición correcta.
                            </p>
                        </article>
                    </div>
                </section>

                <section className="contact-section" ref={contactUsRef}>
                    <div className="section-heading">
                        <p>Contacto</p>
                        <h2>Canales de contacto y activación de cuenta</h2>
                    </div>

                    <div className="contact-layout">
                        <Card className="contact-banner-card" elevation={0}>
                            <CardContent className="contact-banner-header">
                                <p className="contact-kicker">
                                    Soporte comercial y técnico
                                </p>
                                <h3>Hablemos de tu implementación NetBin</h3>
                                <p className="contact-subtitle">
                                    Atendemos pilotos, despliegues empresariales
                                    y acompañamiento operativo.
                                </p>
                            </CardContent>
                            <Divider />
                            <CardContent className="contact-banner-body">
                                <div className="contact-points">
                                    <div className="contact-point">
                                        <span>📧</span>
                                        <div>
                                            <strong>Correo</strong>
                                            <p>contacto@netbin.co</p>
                                        </div>
                                    </div>
                                    <div className="contact-point">
                                        <span>📞</span>
                                        <div>
                                            <strong>Teléfono</strong>
                                            <p>+57 300 000 0000</p>
                                        </div>
                                    </div>
                                    <div className="contact-point">
                                        <span>🕒</span>
                                        <div>
                                            <strong>Horario</strong>
                                            <p>
                                                Lunes a viernes · 8:00 a.m. –
                                                6:00 p.m.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-chip-row">
                                    <Chip
                                        label="Respuesta inicial en 24h"
                                        className="contact-chip"
                                    />
                                    <Chip
                                        label="Soporte para empresas"
                                        className="contact-chip"
                                    />
                                </div>

                                <div className="contact-actions">
                                    <Button
                                        className="uiverse-btn mui-btn cta-primary contact-action-btn"
                                        component="a"
                                        href="mailto:contacto@netbin.co"
                                    >
                                        Enviar correo
                                    </Button>
                                    <button
                                        type="button"
                                        className="uiverse-btn"
                                        onClick={togglePopUp}
                                    >
                                        <span>Crear cuenta</span>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="contact-form-card" elevation={0}>
                            <CardContent className="contact-form-header">
                                <p className="contact-kicker">
                                    Formulario rápido
                                </p>
                                <h3>Cuéntanos tu necesidad</h3>
                            </CardContent>
                            <Divider />
                            <CardContent className="contact-card">
                                <TextField
                                    {...fieldProps}
                                    required
                                    label="Nombre"
                                    placeholder="Tu nombre completo"
                                    value={contactName}
                                    onChange={(e) =>
                                        setContactName(e.target.value)
                                    }
                                />
                                <TextField
                                    {...fieldProps}
                                    required
                                    label="Correo"
                                    placeholder="tu-correo@empresa.com"
                                    value={contactEmail}
                                    onChange={(e) =>
                                        setContactEmail(e.target.value)
                                    }
                                />
                                <TextField
                                    {...fieldProps}
                                    required
                                    multiline
                                    minRows={4}
                                    label="Mensaje"
                                    placeholder="Ejemplo: quiero implementar 15 estaciones NetBin en mi campus."
                                    value={contactMessage}
                                    onChange={(e) =>
                                        setContactMessage(e.target.value)
                                    }
                                />

                                <div className="file-field-block">
                                    <Button
                                        component="label"
                                        className="uiverse-btn mui-btn file-upload-btn"
                                    >
                                        Adjuntar archivo (opcional)
                                        <input
                                            hidden
                                            type="file"
                                            onChange={(event) =>
                                                setContactFileName(
                                                    event.target.files?.[0]
                                                        ?.name || "",
                                                )
                                            }
                                        />
                                    </Button>
                                    <p className="file-field-name">
                                        {contactFileName ||
                                            "Ningún archivo seleccionado"}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="uiverse-btn uiverse-wide"
                                    onClick={ContactForm}
                                >
                                    <span>Enviar mensaje</span>
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <footer className="landing-footer">
                <p>
                    © {new Date().getFullYear()} NetBin · Innovación para un
                    reciclaje inteligente.
                </p>
            </footer>

            {isOpen && (
                <div className="modal-backdrop">
                    <div className="modal-card register-modal-card">
                        <button
                            type="button"
                            className="uiverse-btn close-modal register-close"
                            onClick={togglePopUp}
                        >
                            <MdiCloseOutline className="svgIcon" />
                        </button>
                        <RegisterUiverseForm
                            firstname={firstname}
                            lastname={lastname}
                            email={username}
                            password={password}
                            confirmPassword={confirmPassword}
                            onFirstnameChange={(e) =>
                                setFirstName(e.target.value)
                            }
                            onLastnameChange={(e) =>
                                setLastname(e.target.value)
                            }
                            onEmailChange={handleEmailChange}
                            onPasswordChange={handlePasswordChange}
                            onConfirmPasswordChange={
                                handleConfirmPasswordChange
                            }
                            onSubmit={RegisterForm}
                            emailError={usernameError}
                            passwordError={passwordError}
                            confirmPasswordError={confirmPasswordError}
                            message={registerMessage}
                            showSuccess={showSuccess}
                        />
                    </div>
                </div>
            )}

            <Link to="/dashboard/overview" className="floating-dashboard-link">
                Ir al dashboard
            </Link>

            {contactStatusMessage && !isOpen && (
                <div className="toast-message">{contactStatusMessage}</div>
            )}
        </div>
    );
}
