import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RiUserLine, RiShieldLine, RiGlobalLine, RiCoinLine } from '@remixicon/react';
import { API_BASE_URL, API_URL_FROM_ENV } from '../../config/env';

const ff = "'Outfit', system-ui, sans-serif";
const ffMono = "'JetBrains Mono', monospace";

const cardStyle = {
  borderRadius: '18px',
  background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
  border: '1px solid rgba(15,23,42,0.10)',
  boxShadow: '0 12px 28px -24px rgba(15,23,42,0.24)',
  padding: '20px 22px',
};

const labelStyle = {
  margin: 0,
  fontSize: '12px',
  color: '#475569',
  fontWeight: 600,
  letterSpacing: '0.01em',
  fontFamily: ff,
};

function SectionCard({ icon, title, subtitle, children }) {
  return (
    <section style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#0f766e', display: 'inline-flex' }}>{icon}</span>
          <h3
            style={{
              margin: 0,
              color: '#0f172a',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.01em',
              fontFamily: ff,
            }}
          >
            {title}
          </h3>
        </div>
      </div>
      {subtitle && (
        <p style={{ margin: '0 0 14px', color: '#64748b', fontSize: '12px', fontFamily: ff }}>
          {subtitle}
        </p>
      )}
      {children}
    </section>
  );
}

const formatRole = (role) => {
  if (!role) return '—';
  return String(role).toLowerCase() === 'admin' ? 'Administrador' : 'Usuario';
};

export default function SettingsPage() {
  const { user } = useAuth();

  const [form, setForm] = useState({ firstname: '', lastname: '' });
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  useEffect(() => {
    setForm({
      firstname: user?.firstname ?? '',
      lastname: user?.lastname ?? '',
    });
    setTouched(false);
    setStatus({ type: 'idle', text: '' });
  }, [user?.firstname, user?.lastname]);

  const fullName = `${form.firstname} ${form.lastname}`.trim() || 'Sin nombre';
  const initials = `${form.firstname?.[0] ?? ''}${form.lastname?.[0] ?? ''}`.toUpperCase() || '?';

  const firstValid = form.firstname.trim().length >= 2;
  const lastValid = form.lastname.trim().length >= 2;
  const isValid = firstValid && lastValid;

  const hasChanges = useMemo(() => {
    const baseFirst = user?.firstname?.trim() ?? '';
    const baseLast = user?.lastname?.trim() ?? '';
    return form.firstname.trim() !== baseFirst || form.lastname.trim() !== baseLast;
  }, [form.firstname, form.lastname, user?.firstname, user?.lastname]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched(true);
    setStatus({ type: 'idle', text: '' });
  };

  const handleReset = () => {
    setForm({
      firstname: user?.firstname ?? '',
      lastname: user?.lastname ?? '',
    });
    setTouched(false);
    setStatus({ type: 'idle', text: '' });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!isValid) {
      setStatus({ type: 'error', text: 'Completa nombre y apellido (mínimo 2 caracteres).' });
      return;
    }

    if (!hasChanges) {
      setStatus({ type: 'info', text: 'No hay cambios por guardar.' });
      return;
    }

    // Nota: persistencia de backend en siguiente fase.
    setStatus({ type: 'success', text: 'Perfil actualizado localmente.' });
    setTouched(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '860px', fontFamily: ff }}>
      <header>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.015em' }}>
          Configuración
        </h2>
        <p style={{ margin: '4px 0 0', color: '#475569', fontSize: '13px' }}>
          Organiza tu perfil y revisa la información de tu cuenta.
        </p>
      </header>

      <SectionCard
        icon={<RiUserLine size={17} />}
        title="Resumen de perfil"
        subtitle="Datos principales para identificar tu cuenta dentro de la plataforma"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(16,185,129,0.12)',
              color: '#065f46',
              border: '1px solid rgba(16,185,129,0.30)',
              fontWeight: 800,
              fontSize: '16px',
              fontFamily: ff,
              flexShrink: 0,
            }}
          >
            {initials}
          </div>

          <div style={{ minWidth: '220px', flex: 1 }}>
            <p style={{ margin: 0, color: '#0f172a', fontSize: '16px', fontWeight: 700, fontFamily: ff }}>{fullName}</p>
            <p style={{ margin: '2px 0 0', color: '#475569', fontSize: '13px', fontFamily: ff }}>{user?.username ?? 'Sin correo'}</p>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 10px',
              borderRadius: '999px',
              background: 'rgba(16,185,129,0.10)',
              border: '1px solid rgba(16,185,129,0.26)',
              color: '#065f46',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <RiCoinLine size={13} />
            {user?.cobins ?? 0} CoBins
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px',
            marginTop: '14px',
          }}
        >
          {[
            { label: 'Rol', value: formatRole(user?.role) },
            { label: 'Correo', value: user?.username ?? '—' },
            { label: 'ID de usuario', value: user?.id ? String(user.id) : 'No disponible' },
          ].map(({ label, value }) => (
            <div key={label} style={{ border: '1px solid rgba(15,23,42,0.10)', borderRadius: '12px', padding: '10px 12px', background: '#ffffff' }}>
              <p style={{ ...labelStyle, marginBottom: '4px' }}>{label}</p>
              <p style={{ margin: 0, color: '#0f172a', fontSize: '13px', fontWeight: 600, fontFamily: ff, wordBreak: 'break-word' }}>{value}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        icon={<RiShieldLine size={17} />}
        title="Editar información de perfil"
        subtitle="Actualiza tus datos visibles para el sistema"
      >
        <form onSubmit={handleSave}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle} htmlFor="firstname">Nombre</label>
              <input
                id="firstname"
                className="nb-input"
                value={form.firstname}
                onChange={(e) => handleChange('firstname', e.target.value)}
                placeholder="Ej: Juan"
                style={{
                  height: '40px',
                  borderColor: touched && !firstValid ? 'rgba(220,38,38,0.45)' : 'rgba(148,163,184,0.45)',
                }}
              />
              {touched && !firstValid && (
                <p style={{ margin: 0, color: '#b91c1c', fontSize: '11px', fontFamily: ff }}>
                  El nombre debe tener mínimo 2 caracteres.
                </p>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle} htmlFor="lastname">Apellido</label>
              <input
                id="lastname"
                className="nb-input"
                value={form.lastname}
                onChange={(e) => handleChange('lastname', e.target.value)}
                placeholder="Ej: Pérez"
                style={{
                  height: '40px',
                  borderColor: touched && !lastValid ? 'rgba(220,38,38,0.45)' : 'rgba(148,163,184,0.45)',
                }}
              />
              {touched && !lastValid && (
                <p style={{ margin: 0, color: '#b91c1c', fontSize: '11px', fontFamily: ff }}>
                  El apellido debe tener mínimo 2 caracteres.
                </p>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle} htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                className="nb-input"
                value={user?.username ?? ''}
                disabled
                style={{ height: '40px', background: '#f1f5f9', color: '#475569', borderColor: 'rgba(148,163,184,0.35)' }}
              />
              <p style={{ margin: 0, color: '#64748b', fontSize: '11px', fontFamily: ff }}>Este campo se gestiona desde autenticación.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
            <button type="submit" className="nb-btn nb-btn-primary" disabled={!isValid} style={{ minWidth: '150px', opacity: !isValid ? 0.6 : 1 }}>
              Guardar cambios
            </button>
            <button type="button" className="nb-btn" onClick={handleReset} disabled={!hasChanges} style={{ minWidth: '110px', opacity: !hasChanges ? 0.6 : 1 }}>
              Restablecer
            </button>

            {status.type !== 'idle' && (
              <span
                style={{
                  marginLeft: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color:
                    status.type === 'success'
                      ? '#065f46'
                      : status.type === 'error'
                        ? '#b91c1c'
                        : '#334155',
                  fontFamily: ff,
                }}
              >
                {status.text}
              </span>
            )}
          </div>
        </form>
      </SectionCard>

      {import.meta.env.DEV && (
        <SectionCard icon={<RiGlobalLine size={17} />} title="Entorno (desarrollo)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: '12px', fontFamily: ffMono }}>VITE_API_URL</p>
              <p style={{ margin: 0, color: '#475569', fontSize: '12px', fontFamily: ffMono, wordBreak: 'break-all', textAlign: 'right' }}>{API_BASE_URL}</p>
            </div>
            {!API_URL_FROM_ENV && (
              <p style={{ margin: 0, color: '#92400e', fontSize: '12px', fontFamily: ff }}>
                Usando fallback local (define VITE_API_URL en tu entorno).
              </p>
            )}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
