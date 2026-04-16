import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function RegisterUiverseForm({
  firstname,
  lastname,
  email,
  password,
  confirmPassword,
  onFirstnameChange,
  onLastnameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  emailError,
  passwordError,
  confirmPasswordError,
  message,
  showSuccess,
}) {
  const inlineError = emailError || passwordError || confirmPasswordError || message;

  return (
    <StyledWrapper>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="form-header">
          <p className="form-title">Crear cuenta</p>
          <p className="form-sub">Únete a NetBin y empieza a reciclar mejor.</p>
        </div>

        <div className="row-2">
          <div className="field-block">
            <label className="field-label">Nombre</label>
            <div className="input-wrap">
              <input
                required
                placeholder="Tu nombre"
                type="text"
                className="field-input"
                value={firstname}
                onChange={onFirstnameChange}
              />
            </div>
          </div>
          <div className="field-block">
            <label className="field-label">Apellido</label>
            <div className="input-wrap">
              <input
                required
                placeholder="Tu apellido"
                type="text"
                className="field-input"
                value={lastname}
                onChange={onLastnameChange}
              />
            </div>
          </div>
        </div>

        <div className="field-block">
          <label className="field-label">Correo electrónico</label>
          <div className="input-wrap">
            <input
              required
              placeholder="tu@correo.com"
              type="email"
              className="field-input"
              value={email}
              onChange={onEmailChange}
            />
          </div>
          {emailError && <p className="field-error">{emailError}</p>}
        </div>

        <div className="field-block">
          <label className="field-label">Contraseña</label>
          <div className="input-wrap">
            <input
              required
              placeholder="Mín. 8 caracteres, 1 mayúscula y 1 símbolo"
              type="password"
              className="field-input"
              value={password}
              onChange={onPasswordChange}
            />
          </div>
          {passwordError && <p className="field-error">{passwordError}</p>}
        </div>

        <div className="field-block">
          <label className="field-label">Confirmar contraseña</label>
          <div className="input-wrap">
            <input
              required
              placeholder="Repite tu contraseña"
              type="password"
              className="field-input"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
            />
          </div>
          {confirmPasswordError && <p className="field-error">{confirmPasswordError}</p>}
        </div>

        {showSuccess ? (
          <div className="success-box">{message}</div>
        ) : (
          <button className="btn-submit" type="submit">
            <span>Crear cuenta</span>
          </button>
        )}

        {!showSuccess && inlineError && !emailError && !passwordError && !confirmPasswordError && (
          <div className="error-box">
            <span>⚠</span> {inlineError}
          </div>
        )}

        <p className="signin-row">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="link-accent">Iniciar sesión</Link>
        </p>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  font-family: 'Outfit', system-ui, sans-serif;

  .form {
    display: flex;
    flex-direction: column;
    gap: 13px;
    width: min(380px, 92vw);
    background: #ffffff;
    padding: 28px 26px 24px;
    border-radius: 20px;
    border: 1px solid #d4ddd9;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.6) inset,
      0 24px 52px -24px rgba(8,30,20,0.44);
  }

  .form-header { margin-bottom: 2px; }

  .form-title {
    margin: 0;
    color: #0d2217;
    font-size: 1.42rem;
    font-weight: 800;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }

  .form-sub {
    margin: 5px 0 0;
    color: #7a9588;
    font-size: 0.84rem;
  }

  .row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .field-block {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .field-label {
    color: #1a3328;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .input-wrap {
    border: 1.5px solid #e0e9e4;
    border-radius: 10px;
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    background: #fdfefe;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .input-wrap:focus-within {
    border-color: #1a5c3a;
  }

  .field-input {
    border: none;
    width: 100%;
    height: 100%;
    background: transparent;
    outline: 0;
    font-family: 'Outfit', system-ui, sans-serif;
    font-size: 0.88rem;
    color: #0d2217;
    -webkit-appearance: none;
    appearance: none;
  }

  .field-input:focus {
    outline: 0;
    border: none;
  }

  .field-input::placeholder {
    color: #aabfb6;
    font-size: 0.83rem;
  }

  .field-error {
    margin: 0;
    color: #8a5230;
    font-size: 0.78rem;
    font-weight: 600;
  }

  .error-box {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(185,100,80,0.2);
    background: rgba(185,80,60,0.05);
    color: #8a4a35;
    font-size: 0.82rem;
    font-weight: 600;
    margin: 0;
  }

  .success-box {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid rgba(45,117,84,0.3);
    background: rgba(45,117,84,0.07);
    color: #1f6a42;
    font-size: 0.88rem;
    font-weight: 700;
    text-align: center;
  }

  .btn-submit {
    position: relative;
    overflow: hidden;
    border: none;
    background: #082415;
    color: #fff;
    font-family: 'Outfit', system-ui, sans-serif;
    font-size: 0.92rem;
    font-weight: 700;
    border-radius: 10px;
    height: 46px;
    width: 100%;
    cursor: pointer;
    margin-top: 4px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    box-shadow:
      0 1px 0 rgba(255,255,255,0.07) inset,
      0 6px 18px -8px rgba(8,30,20,0.48);
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
      rgba(255,255,255,0.13) 50%,
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
      0 10px 22px -8px rgba(8,30,20,0.52);
  }

  .btn-submit:hover::before {
    transform: translateX(160%) skewX(-15deg);
  }

  .btn-submit:active { transform: translateY(0); }

  .signin-row {
    text-align: center;
    color: #6a8578;
    font-size: 0.84rem;
    margin: 0;
  }

  .link-accent {
    color: #1a5c3a;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.15s;
  }

  .link-accent:hover {
    color: #082415;
    text-decoration: underline;
  }
`;
