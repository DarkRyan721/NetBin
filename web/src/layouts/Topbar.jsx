import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RiBellLine, RiLogoutBoxRLine, RiCoinLine } from '@remixicon/react';

const PAGE_META = {
  '/dashboard/overview': { title: 'Resumen General',     subtitle: 'Vista en tiempo real del sistema'   },
  '/dashboard/nodes':    { title: 'Nodos IoT',           subtitle: 'Gestión de nodos de la red'         },
  '/dashboard/sensors':  { title: 'Sensores',            subtitle: 'Monitoreo de sensores conectados'   },
  '/dashboard/waste':    { title: 'Residuos',            subtitle: 'Historial de clasificaciones'       },
  '/dashboard/users':    { title: 'Usuarios',            subtitle: 'Administración de cuentas'          },
  '/dashboard/settings': { title: 'Configuración',       subtitle: 'Ajustes de cuenta y sistema'        },
};

export default function Topbar() {
  const { pathname }  = useLocation();
  const { user, logout } = useAuth();

  const meta = PAGE_META[pathname] ?? { title: 'Dashboard', subtitle: '' };

  const initials = user
    ? `${user.firstname?.[0] ?? ''}${user.lastname?.[0] ?? ''}`.toUpperCase()
    : '?';

  return (
    <header
      style={{
        height: '72px',
        background: 'rgba(11,21,16,0.78)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 26px',
        flexShrink: 0,
        fontFamily: "'Outfit', system-ui, sans-serif",
      }}
    >
      {/* Page title with accent bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '3px',
            height: '22px',
            borderRadius: '99px',
            background: 'linear-gradient(180deg, #34d399 0%, #10b981 100%)',
            flexShrink: 0,
          }}
        />
        <div>
          <h1
            style={{
              margin: 0,
              color: '#ddeee5',
              fontWeight: '700', 
              fontSize: '16px',
              lineHeight: 1.2,
              fontFamily: "'Outfit', system-ui, sans-serif",
              letterSpacing: '-0.01em',
            }}
          >
            {meta.title}
          </h1>
          {meta.subtitle && (
            <p
              style={{
                margin: 0,
                color: '#2d4038',
                fontSize: '11.5px',
                lineHeight: 1.3,
                marginTop: '2px',
                fontFamily: "'Outfit', system-ui, sans-serif",
              }}
            >
              {meta.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        {/* CoBins badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(16,185,129,0.07)',
            border: '1px solid rgba(16,185,129,0.18)',
            borderRadius: '999px',
            padding: '5px 12px 5px 8px',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'rgba(16,185,129,0.15)',
              border: '1px solid rgba(16,185,129,0.28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <RiCoinLine size={11} style={{ color: '#34d399' }} />
          </div>
          <span
            style={{
              color: '#34d399',
              fontSize: '12.5px',
              fontWeight: '700',
              fontFamily: "'JetBrains Mono', monospace",
              lineHeight: 1,
            }}
          >
            {user?.cobins ?? 0}
          </span>
          <span
            style={{
              color: '#3a5445',
              fontSize: '11px',
              fontWeight: '500',
            }}
          >
            CoBins
          </span>
        </div>

        {/* Notification bell */}
        <button
          className="nb-btn"
          style={{
            width: '38px',
            padding: 0,
          }}
        >
          <RiBellLine size={16} />
        </button>

        {/* Separator */}
        <div style={{ width: '1px', height: '24px', background: 'rgba(16,185,129,0.08)', margin: '0 2px' }} />

        {/* User info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }} className="hidden md:block">
            <p
              style={{
                margin: 0,
                color: '#c8ddd4',
                fontSize: '13px',
                fontWeight: '600',
                lineHeight: 1.2,
                fontFamily: "'Outfit', system-ui, sans-serif",
              }}
            >
              {user?.firstname ?? ''} {user?.lastname ?? ''}
            </p>
            <p
              style={{
                margin: '2px 0 0',
                color: '#2d4038',
                fontSize: '11px',
                textTransform: 'capitalize',
                fontFamily: "'Outfit', system-ui, sans-serif",
              }}
            >
              {user?.role?.toLowerCase() ?? ''}
            </p>
          </div>

          {/* Avatar */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399',
              fontSize: '11px',
              fontWeight: '800',
              flexShrink: 0,
              fontFamily: "'Outfit', system-ui, sans-serif",
              cursor: 'default',
              boxShadow: '0 0 12px -6px rgba(16,185,129,0.4)',
            }}
          >
            {initials}
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            title="Cerrar sesión"
            className="nb-btn"
            style={{
              width: '36px',
              padding: 0,
            }}
          >
            <RiLogoutBoxRLine size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
