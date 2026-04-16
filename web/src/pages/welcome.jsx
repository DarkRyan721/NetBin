import React, { useRef, useState, useCallback } from "react";
import emailjs from '@emailjs/browser';
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
    SiRaspberrypi,
    SiPython,
} from "react-icons/si";
import { PiCoins } from "react-icons/pi";
import { RiUserSmileLine, RiBuilding2Line, RiLeafLine } from "react-icons/ri";
import binImage from "../assets/Gemini_Generated_Image_hoi32mhoi32mhoi3.png";
import { MdiCloseOutline } from "../components/Close_Icon";
import RegisterUiverseForm from "../components/RegisterUiverseForm";
import { Link } from "react-router-dom";
import heroBg from "../assets/qingbao-meng-01_igFr7hd4-unsplash.jpg";
import GridDistortion from "../components/GridDistortion";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from '../hooks/useLenis';
import { Reveal } from '../components/Reveal';
import { apiUrl } from "../config/env";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_UPPER = /[A-Z]/;
const PASSWORD_SYMBOL = /[!@#$%^&*(),.?":{}|<>]/;
const FIELD_PROPS = {
    variant: "outlined",
    fullWidth: true,
    className: "mui-field",
    size: "medium",
};

export default function WelcomePage() {

    const informationRef = useRef(null);
    const featuresRef = useRef(null);
    const instructionRef = useRef(null);
    const welcomeRef = useRef(null);
    const contactUsRef = useRef(null);
    const navLinksRef = useRef(null);
    const pillRef = useRef(null);

    useLenis();
    const { scrollYProgress } = useScroll({ target: welcomeRef, offset: ['start start', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const innerY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
    const innerOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

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
    const [isSending, setIsSending] = useState(false);

    const scrollTo = useCallback(
        (ref) => ref.current?.scrollIntoView({ behavior: "smooth" }),
        [],
    );

    const movePill = useCallback((e) => {
        const pill = pillRef.current;
        const container = navLinksRef.current;
        if (!pill || !container) return;
        const btnRect = e.currentTarget.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        pill.style.left = `${btnRect.left - containerRect.left}px`;
        pill.style.width = `${btnRect.width}px`;
        pill.style.opacity = "1";
    }, []);

    const hidePill = useCallback(() => {
        if (pillRef.current) pillRef.current.style.opacity = "0";
    }, []);

    const togglePopUp = useCallback(() =>
        setIsOpen((prev) => {
            const next = !prev;
            if (next) {
                setRegisterMessage("");
                setShowSuccess(false);
            }
            return next;
        }), []);

    const handleEmailChange = useCallback((e) => {
        const value = e.target.value;
        setUserName(value);
        if (!EMAIL_REGEX.test(value)) {
            setUserNameError("Correo no válido");
            setIsUsernameValid(false);
        } else {
            setUserNameError("");
            setIsUsernameValid(true);
        }
    }, []);

    const handlePasswordChange = useCallback((e) => {
        const value = e.target.value;
        setPassword(value);
        const valid =
            value.length >= 8 &&
            PASSWORD_UPPER.test(value) &&
            PASSWORD_SYMBOL.test(value);
        setPasswordError(valid ? "" : "Mínimo 8 caracteres, una mayúscula y un símbolo.");
        setIsPasswordValid(valid);
        setConfirmPasswordError(
            confirmPassword && confirmPassword !== value
                ? "Las contraseñas no coinciden."
                : "",
        );
    }, [confirmPassword]);

    const handleConfirmPasswordChange = useCallback((e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setConfirmPasswordError(
            value && value !== password ? "Las contraseñas no coinciden." : "",
        );
    }, [password]);

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

            const response = await fetch(apiUrl("/auth/register"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

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

    const ContactForm = useCallback(async () => {
        if (!contactName || !contactEmail || !contactMessage) {
            setContactStatusMessage("Por favor completa todos los campos requeridos.");
            return;
        }

        setIsSending(true);
        setContactStatusMessage("");

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: contactName,
                    from_email: contactEmail,
                    message: contactMessage,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setContactStatusMessage("¡Mensaje enviado! Pronto nos pondremos en contacto.");
            setContactName("");
            setContactEmail("");
            setContactMessage("");
            setContactFileName("");
        } catch {
            setContactStatusMessage("Error al enviar. Intenta de nuevo o escríbenos directamente.");
        } finally {
            setIsSending(false);
        }
    }, [contactName, contactEmail, contactMessage]);

    return (
        <div className="landing-page">
            <header className="landing-nav">
                <nav className="nav-island">
                    {/* ── Brand ── */}
                    <button
                        type="button"
                        className="nav-brand"
                        onClick={() => scrollTo(welcomeRef)}
                    >
                        <div className="nav-brand-icon">
                            <LogoNetBin />
                        </div>
                        <span className="nav-brand-name">NetBin</span>
                    </button>

                    {/* ── Links con píldora ── */}
                    <div
                        className="nav-links"
                        ref={navLinksRef}
                        onMouseLeave={hidePill}
                    >
                        <span className="nav-pill" ref={pillRef} />
                        <button type="button" className="nav-btn" onClick={() => scrollTo(informationRef)} onMouseEnter={movePill}>Producto</button>
                        <button type="button" className="nav-btn" onClick={() => scrollTo(featuresRef)} onMouseEnter={movePill}>Beneficios</button>
                        <button type="button" className="nav-btn" onClick={() => scrollTo(instructionRef)} onMouseEnter={movePill}>Uso</button>
                        <button type="button" className="nav-btn" onClick={() => scrollTo(contactUsRef)} onMouseEnter={movePill}>Contáctanos</button>
                    </div>

                    {/* ── CTA ── */}
                    <div className="nav-cta">
                        <button
                            type="button"
                            className="nav-register-btn"
                            onClick={togglePopUp}
                        >
                            Registrarse
                        </button>
                        <Button
                            className="nav-ingresar-btn"
                            component={Link}
                            to="/login"
                        >
                            Ingresar
                        </Button>
                    </div>
                </nav>
            </header>

            {/* ── Hero full-bleed ── */}
            <section className="hero" ref={welcomeRef}>
                <motion.div className="hero-bg-distortion" style={{ y: bgY }}>
                    <GridDistortion
                        imageSrc={heroBg}
                        grid={10}
                        mouse={0.1}
                        strength={0.15}
                        relaxation={0.9}
                    />
                </motion.div>
                <div className="hero-overlay" />

                <motion.div className="hero-inner" style={{ y: innerY, opacity: innerOpacity }}>
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
                                className="uiverse-btn mui-btn hero-solid-btn"
                                onClick={() => scrollTo(informationRef)}
                            >
                                Conocer NetBin
                            </Button>
                            <Button
                                className="uiverse-btn mui-btn hero-outline-btn"
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
                </motion.div>

                <div className="hero-scroll-hint" onClick={() => scrollTo(informationRef)}>
                    <span />
                </div>
            </section>

            <main>
                <section className="info-section" ref={informationRef}>
                    <Reveal>
                    <div className="section-heading">
                        <p>Producto</p>
                        <h2>
                            IA de frontera, hardware inteligente y recompensas reales
                        </h2>
                    </div>
                    </Reveal>

                    <div className="info-grid">
                        <motion.article
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.72, ease: [0.16,1,0.3,1], delay: 0 }}>
                            <div className="product-icon-row">
                                <OpenAI size={28} />
                                <Claude size={28} />
                                <Ollama size={26} />
                            </div>
                            <h3>Modelos de Frontera</h3>
                            <p>GPT-4o, Claude y Whisper — voz a clasificación sin tocar pantalla.</p>
                        </motion.article>
                        <motion.article
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.72, ease: [0.16,1,0.3,1], delay: 0.1 }}>
                            <div className="product-icon-row">
                                <PiCoins size={30} />
                            </div>
                            <h3>CoBins — Tu moneda verde</h3>
                            <p>Canjeable en billeteras digitales, cripto y tiendas aliadas.</p>
                        </motion.article>
                        <motion.article
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.72, ease: [0.16,1,0.3,1], delay: 0.2 }}>
                            <div className="product-icon-row">
                                <SiRaspberrypi size={26} />
                                <SiPython size={26} />
                            </div>
                            <h3>IoT + Telemetría</h3>
                            <p>Edge computing en Raspberry Pi con MQTT — telemetría y control en tiempo real.</p>
                        </motion.article>
                    </div>
                </section>

                <section className="features-section" ref={featuresRef}>
                    <Reveal>
                    <div className="section-heading">
                        <p>Beneficios</p>
                        <h2>Diseñado para las personas. Construido para el impacto.</h2>
                    </div>
                    </Reveal>

                    <div className="feature-cards">
                        <motion.article
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.72, ease: [0.16,1,0.3,1], delay: 0 }}>
                            <div className="feature-icon-wrap">
                                <RiUserSmileLine size={22} />
                            </div>
                            <h3>Recicla sin fricciones</h3>
                            <p>Solo habla, bota y recibe CoBins al instante. Sin apps ni carteles.</p>
                        </motion.article>
                        <motion.article
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.72, ease: [0.16,1,0.3,1], delay: 0.1 }}>
                            <div className="feature-icon-wrap">
                                <RiBuilding2Line size={22} />
                            </div>
                            <h3>Tu campus, bajo control</h3>
                            <p>Alertas de llenado y rutas de recolección optimizadas en tiempo real.</p>
                        </motion.article>
                        <motion.article
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.72, ease: [0.16,1,0.3,1], delay: 0.2 }}>
                            <div className="feature-icon-wrap">
                                <RiLeafLine size={22} />
                            </div>
                            <h3>Impacto que se mide</h3>
                            <p>Reportes ESG automáticos y huella de carbono verificable por área.</p>
                        </motion.article>
                    </div>
                </section>

                <section className="instructions" ref={instructionRef}>
                    <Reveal>
                    <div className="section-heading">
                        <p>Experiencia</p>
                        <h2>Tres momentos que convierten el hábito en recompensa</h2>
                    </div>
                    </Reveal>

                    <div className="steps-layout">
                        <motion.div className="steps-bin-visual"
                            initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}>
                            <img src={binImage} alt="NetBin — caneca inteligente de reciclaje" />
                        </motion.div>

                        <div className="steps-list">
                            <motion.div className="step-card"
                                initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.72, ease: [0.16,1,0.3,1], delay: 0.07 }}>
                                <span className="step-num">01</span>
                                <div className="step-body">
                                    <h3>Acércate y sé reconocido</h3>
                                    <p>Tap NFC o acércate — RFID te identifica al instante y activa recompensas.</p>
                                </div>
                            </motion.div>
                            <motion.div className="step-card"
                                initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.72, ease: [0.16,1,0.3,1], delay: 0.15 }}>
                                <span className="step-num">02</span>
                                <div className="step-body">
                                    <h3>Habla — la IA clasifica</h3>
                                    <p>Whisper transcribe, el modelo decide y el compartimento correcto se abre.</p>
                                </div>
                            </motion.div>
                            <motion.div className="step-card"
                                initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.72, ease: [0.16,1,0.3,1], delay: 0.23 }}>
                                <span className="step-num">03</span>
                                <div className="step-body">
                                    <h3>Bota, gana y canjea</h3>
                                    <p>Clasifica correctamente, acumula CoBins y canjéalos en tiendas aliadas.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="contact-section" ref={contactUsRef}>
                    <Reveal>
                    <div className="section-heading">
                        <p>Contacto</p>
                        <h2>Canales de contacto y activación de cuenta</h2>
                    </div>
                    </Reveal>

                    <div className="contact-layout">
                        <Reveal delay={0} style={{ display: 'flex', flexDirection: 'column' }}>
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
                                        <div>
                                            <strong>Correo</strong>
                                            <p>miguelangelcera@outlook.com</p>
                                            <p>collinandrey@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="contact-point">
                                        <div>
                                            <strong>Teléfono</strong>
                                            <p>+57 3194753814</p>
                                            <p>+57 315 0930885</p>
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
                        </Reveal>

                        <Reveal delay={0.13} style={{ display: 'flex', flexDirection: 'column' }}>
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
                                    {...FIELD_PROPS}
                                    required
                                    label="Nombre"
                                    placeholder="Tu nombre completo"
                                    value={contactName}
                                    onChange={(e) =>
                                        setContactName(e.target.value)
                                    }
                                />
                                <TextField
                                    {...FIELD_PROPS}
                                    required
                                    label="Correo"
                                    placeholder="tu-correo@empresa.com"
                                    value={contactEmail}
                                    onChange={(e) =>
                                        setContactEmail(e.target.value)
                                    }
                                />
                                <TextField
                                    {...FIELD_PROPS}
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
                                    disabled={isSending}
                                    style={{ opacity: isSending ? 0.7 : 1 }}
                                >
                                    <span>{isSending ? "Enviando..." : "Enviar mensaje"}</span>
                                </button>
                            </CardContent>
                        </Card>
                        </Reveal>
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
                            className="close-modal register-close"
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
