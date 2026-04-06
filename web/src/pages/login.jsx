import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RiLeafLine, RiShieldCheckLine, RiWifiLine } from "@remixicon/react";
import { apiUrl } from "../config/env";

const FEATURES = [
    { icon: <RiWifiLine size={15} />,        text: "Monitoreo de canecas en tiempo real" },
    { icon: <RiLeafLine size={15} />,        text: "Clasificación asistida con IA"       },
    { icon: <RiShieldCheckLine size={15} />, text: "Acceso seguro con JWT"               },
];

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername]     = useState("");
    const [password, setPassword]     = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError]           = useState("");
    const [loading, setLoading]       = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setError("Por favor completa todos los campos.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const res = await fetch(apiUrl("/auth/login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, rememberMe }),
            });

            if (!res.ok) {
                throw new Error("Credenciales incorrectas. Verifica tu correo y contraseña.");
            }

            const data = await res.json();
            await login(data.token);
            navigate("/dashboard/overview");
        } catch (err) {
            setError(err.message || "Error al conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper>
            <aside className="left-panel">
                <div className="brand-row">
                    <div className="brand-icon">
                        <RiLeafLine size={17} />
                    </div>
                    <span>NetBin</span>
                </div>

                <div className="left-copy">
                    <h1>Accede a tu panel IoT</h1>
                    <p>
                        Gestiona nodos, sensores y métricas de reciclaje desde
                        una sola plataforma.
                    </p>
                    <ul>
                        {FEATURES.map(({ icon, text }) => (
                            <li key={text}>
                                <span className="feat-icon">{icon}</span>
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="left-footer">
                    <span className="live-dot" />
                    Sistema operativo · NetBin v1.0
                </div>
            </aside>

            <section className="right-panel">
                <StyledWrapper>
                    <div className="login-shell">
                        <Link to="/" className="back-home-btn">
                            ← Volver al inicio
                        </Link>

                        <form className="form" onSubmit={handleLogin}>
                            <div className="form-header">
                                <p className="form-title">Iniciar sesión</p>
                                <p className="form-sub">Ingresa tus credenciales para continuar</p>
                            </div>

                            <div className="field-block">
                                <label className="field-label">Correo electrónico</label>
                                <div className="inputForm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={17} viewBox="0 0 32 32" height={17} className="field-icon">
                                        <g data-name="Layer 3" id="Layer_3">
                                            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                                        </g>
                                    </svg>
                                    <input
                                        placeholder="tu@correo.com"
                                        className="input"
                                        type="email"
                                        autoComplete="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field-block">
                                <label className="field-label">Contraseña</label>
                                <div className="inputForm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} viewBox="-64 0 512 512" height={16} className="field-icon">
                                        <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                                        <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                                    </svg>
                                    <input
                                        placeholder="••••••••"
                                        className="input"
                                        type="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex-row">
                                <div className="remember-row">
                                    <input
                                        type="checkbox"
                                        id="remember_login"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label htmlFor="remember_login">Recordarme</label>
                                </div>
                                <span className="link-text">¿Olvidaste tu contraseña?</span>
                            </div>

                            {error && (
                                <div className="error-box">
                                    <span>⚠</span> {error}
                                </div>
                            )}

                            <button className="btn-submit" type="submit" disabled={loading}>
                                <span>{loading ? "Verificando..." : "Iniciar sesión"}</span>
                            </button>

                            <p className="p">
                                ¿No tienes cuenta?{" "}
                                <Link to="/" className="link-text">Regístrate</Link>
                            </p>

                            <div className="divider-row">
                                <span className="divider-line" />
                                <span className="divider-text">O continúa con</span>
                                <span className="divider-line" />
                            </div>

                            <div className="social-row">
                                <button className="btn-social" type="button">
                                    <svg xmlSpace="preserve" style={{ enableBackground: "new 0 0 512 512" }} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width={18} version="1.1">
                                        <path d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z" style={{ fill: "#FBBB00" }} />
                                        <path d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" style={{ fill: "#518EF8" }} />
                                        <path d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" style={{ fill: "#28B446" }} />
                                        <path d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z" style={{ fill: "#F14336" }} />
                                    </svg>
                                    Google
                                </button>
                                <button className="btn-social" type="button">
                                    <svg xmlSpace="preserve" style={{ enableBackground: "new 0 0 22.773 22.773" }} viewBox="0 0 22.773 22.773" xmlns="http://www.w3.org/2000/svg" width={17} height={17}>
                                        <g>
                                            <g>
                                                <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
                                                <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
                                            </g>
                                        </g>
                                    </svg>
                                    Apple
                                </button>
                            </div>
                        </form>
                    </div>
                </StyledWrapper>
            </section>
        </PageWrapper>
    );
}

const PageWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    background: #0b1610;
    font-family: 'Outfit', system-ui, sans-serif;

    .left-panel {
        width: 42%;
        padding: 40px 44px;
        color: #c8e0d2;
        background: #08100d;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 48px;
        position: relative;
        overflow: hidden;
    }

    .left-panel::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.035;
        background-image:
            linear-gradient(rgba(16,185,129,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px);
        background-size: 36px 36px;
    }

    .left-panel::after {
        content: '';
        position: absolute;
        top: 20%;
        left: 10%;
        width: 70%;
        height: 60%;
        background: radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 65%);
        pointer-events: none;
    }

    .brand-row {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        font-size: 1.05rem;
        color: #e2ede8;
        letter-spacing: 0.01em;
    }

    .brand-icon {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        background: rgba(16,185,129,0.1);
        border: 1px solid rgba(16,185,129,0.28);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #34d399;
        box-shadow: 0 0 14px -6px rgba(16,185,129,0.4);
    }

    .left-copy {
        position: relative;
        z-index: 1;
        max-width: 400px;
    }

    .left-copy h1 {
        margin: 0;
        color: #e8f4ee;
        font-size: clamp(1.9rem, 2.8vw, 2.5rem);
        font-weight: 800;
        line-height: 1.08;
        letter-spacing: -0.025em;
    }

    .left-copy p {
        margin: 14px 0 0;
        color: #6fa385;
        line-height: 1.62;
        font-size: 0.95rem;
    }

    .left-copy ul {
        margin: 24px 0 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 13px;
    }

    .left-copy li {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #8fc4a8;
        font-size: 0.9rem;
        font-weight: 500;
    }

    .feat-icon {
        width: 28px;
        height: 28px;
        border-radius: 8px;
        background: rgba(16,185,129,0.08);
        border: 1px solid rgba(16,185,129,0.2);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #34d399;
        flex-shrink: 0;
    }

    .left-footer {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.78rem;
        color: #3a5445;
        font-weight: 500;
    }

    .live-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #10b981;
        box-shadow: 0 0 0 2px rgba(16,185,129,0.25);
        animation: nb-breathe 2s ease-in-out infinite;
        flex-shrink: 0;
    }

    .right-panel {
        flex: 1;
        display: grid;
        place-items: center;
        padding: 24px;
        background:
            radial-gradient(
                circle at 6% -4%,
                rgba(217,231,224,0.5) 0%,
                rgba(217,231,224,0.15) 30%,
                transparent 58%
            ),
            linear-gradient(180deg, #f6faf8 0%, #ffffff 50%, #f7faf8 100%);
    }

    @media (max-width: 1024px) {
        .left-panel { display: none; }
    }
`;

const StyledWrapper = styled.div`
    font-family: 'Outfit', system-ui, sans-serif;

    .login-shell {
        width: 420px;
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .back-home-btn {
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 7px 13px;
        border-radius: 999px;
        border: 1px solid #d2ddd8;
        background: rgba(255,255,255,0.85);
        color: #1a3328;
        font-family: 'Outfit', system-ui, sans-serif;
        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
        transition: 0.2s ease;
    }

    .back-home-btn:hover {
        border-color: #10b981;
        color: #059669;
        transform: translateX(-1px);
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 14px;
        background: #ffffff;
        padding: 30px 28px;
        width: 420px;
        border-radius: 20px;
        font-family: 'Outfit', system-ui, sans-serif;
        border: 1px solid #d4ddd9;
        box-shadow:
            0 0 0 1px rgba(255,255,255,0.6) inset,
            0 20px 48px -24px rgba(8,30,20,0.45);
    }

    .form-header {
        margin-bottom: 4px;
    }

    .form-title {
        margin: 0;
        color: #0d2217;
        font-size: 1.45rem;
        font-weight: 800;
        letter-spacing: -0.025em;
        line-height: 1.1;
    }

    .form-sub {
        margin: 5px 0 0;
        color: #7a9588;
        font-size: 0.85rem;
    }

    .field-block {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .field-label {
        color: #1a3328;
        font-size: 0.83rem;
        font-weight: 600;
        letter-spacing: 0.01em;
    }

    .inputForm {
        border: 1.5px solid #e0e9e4;
        border-radius: 11px;
        height: 46px;
        display: flex;
        align-items: center;
        padding: 0 12px;
        gap: 8px;
        overflow: hidden;
        transition: border-color 0.18s ease, box-shadow 0.18s ease;
        background: #fdfefe;
    }

    .inputForm:focus-within {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
    }

    .field-icon {
        fill: #9ab8aa;
        flex-shrink: 0;
    }

    .inputForm:focus-within .field-icon {
        fill: #10b981;
    }

    .input {
        border: none;
        width: 100%;
        height: 100%;
        background: transparent;
        outline: none;
        font-family: 'Outfit', system-ui, sans-serif;
        font-size: 0.9rem;
        color: #0d2217;
        -webkit-appearance: none;
        appearance: none;
    }

    .input::placeholder {
        color: #aabfb6;
        font-family: 'Outfit', system-ui, sans-serif;
    }

    .flex-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }

    .remember-row {
        display: flex;
        align-items: center;
        gap: 7px;
    }

    .remember-row input[type='checkbox'] {
        width: 15px;
        height: 15px;
        accent-color: #10b981;
        cursor: pointer;
    }

    .remember-row label {
        font-size: 0.84rem;
        color: #3a5448;
        cursor: pointer;
        user-select: none;
    }

    .link-text {
        font-size: 0.84rem;
        color: #10b981;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        transition: color 0.15s;
    }

    .link-text:hover {
        color: #059669;
        text-decoration: underline;
    }

    .error-box {
        display: flex;
        align-items: center;
        gap: 7px;
        margin: 0;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid rgba(185,100,80,0.22);
        background: rgba(185,80,60,0.06);
        color: #8a4a35;
        font-size: 0.83rem;
        font-weight: 600;
    }

    .btn-submit {
        position: relative;
        margin: 8px 0 0;
        overflow: hidden;
        border: none;
        background: #082415;
        color: #fff;
        font-family: 'Outfit', system-ui, sans-serif;
        font-size: 0.95rem;
        font-weight: 700;
        border-radius: 11px;
        height: 48px;
        width: 100%;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        box-shadow:
            0 1px 0 rgba(255,255,255,0.07) inset,
            0 6px 18px -8px rgba(8,30,20,0.5);
    }

    .btn-submit span {
        position: relative;
        z-index: 1;
    }

    .btn-submit::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
            108deg,
            transparent 30%,
            rgba(255,255,255,0.14) 50%,
            transparent 70%
        );
        transform: translateX(-140%) skewX(-15deg);
        transition: transform 0.5s ease;
    }

    .btn-submit:hover {
        background: #0d2b1c;
        transform: translateY(-1px);
        box-shadow:
            0 1px 0 rgba(255,255,255,0.07) inset,
            0 10px 22px -8px rgba(8,30,20,0.55);
    }

    .btn-submit:hover::before {
        transform: translateX(160%) skewX(-15deg);
    }

    .btn-submit:active {
        transform: translateY(0);
    }

    .btn-submit:disabled {
        opacity: 0.65;
        cursor: not-allowed;
        transform: none;
    }

    .p {
        text-align: center;
        color: #6a8578;
        font-size: 0.85rem;
        margin: 0;
    }

    .divider-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 2px 0;
    }

    .divider-line {
        flex: 1;
        height: 1px;
        background: #e4ede9;
    }

    .divider-text {
        font-size: 0.8rem;
        color: #9ab5a8;
        font-weight: 500;
        white-space: nowrap;
    }

    .social-row {
        display: flex;
        gap: 10px;
    }

    .btn-social {
        flex: 1;
        height: 44px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Outfit', system-ui, sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        gap: 8px;
        border: 1.5px solid #e2eae6;
        background: #fff;
        color: #1a3328;
        cursor: pointer;
        transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease;
    }

    .btn-social:hover {
        border-color: #b2cfc5;
        background: #f5faf7;
        transform: translateY(-1px);
    }

    @media (max-width: 560px) {
        .login-shell {
            width: min(420px, 92vw);
        }

        .form {
            width: min(420px, 92vw);
            padding: 22px 18px;
        }
    }
`;
