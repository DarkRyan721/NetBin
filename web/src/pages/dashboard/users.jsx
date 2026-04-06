import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { RiGroupLine, RiShieldLine } from '@remixicon/react';

const ff     = "'Outfit', system-ui, sans-serif";
const ffMono = "'JetBrains Mono', monospace";

const panelStyle = {
  borderRadius: '18px',
  background: 'linear-gradient(160deg, rgba(19,31,24,0.92) 0%, rgba(10,18,14,0.72) 100%)',
  border: '1px solid rgba(255,255,255,0.06)',
  overflow: 'hidden',
};

export default function UsersPage() {
  const { user } = useAuth();
  const users = [];

  if (user?.role !== 'ADMIN') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '320px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '64px', height: '64px',
            borderRadius: '16px',
            background: 'rgba(16,185,129,0.05)',
            border: '1px solid rgba(16,185,129,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '16px',
          }}
        >
          <RiShieldLine size={26} style={{ color: '#2d4038' }} />
        </div>
        <h3 style={{ margin: 0, color: '#c8ddd4', fontWeight: '700', fontSize: '17px', fontFamily: ff }}>
          Acceso restringido
        </h3>
        <p style={{ margin: '8px 0 0', color: '#3a5445', fontSize: '13px', maxWidth: '280px', lineHeight: 1.55, fontFamily: ff }}>
          Esta sección requiere privilegios de administrador para ser visualizada.
        </p>
      </div>
    );
  }

  const admins  = users.filter((u) => u.role === 'ADMIN').length;
  const regular = users.filter((u) => u.role !== 'ADMIN').length;

  const stats = [
    { label: 'Total Usuarios',   value: users.length, color: '#ddeee5' },
    { label: 'Administradores',  value: admins,        color: '#c4b5fd' },
    { label: 'Usuarios',         value: regular,       color: '#93c5fd' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ margin: 0, color: '#ddeee5', fontWeight: '700', fontSize: '18px', fontFamily: ff, letterSpacing: '-0.015em' }}>
          Usuarios
        </h2>
        <p style={{ margin: '3px 0 0', color: '#3a5445', fontSize: '13px', fontFamily: ff }}>
          Gestión de cuentas de la plataforma
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        {stats.map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              borderRadius: '16px',
              background: 'linear-gradient(160deg, rgba(20,34,26,0.9) 0%, rgba(11,20,15,0.7) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '16px 18px',
            }}
          >
            <p style={{ margin: 0, fontFamily: ffMono, fontSize: '26px', fontWeight: '600', color, lineHeight: 1.1 }}>{value}</p>
            <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#3a5445', fontFamily: ff }}>{label}</p>
          </div>
        ))}
      </div>

      <div style={panelStyle}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(16,185,129,0.07)' }}>
          <p style={{ margin: 0, color: '#c8ddd4', fontWeight: '600', fontSize: '14px', fontFamily: ff }}>
            Lista de Usuarios
          </p>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(16,185,129,0.07)' }}>
              {['Nombre', 'Email', 'Rol', 'CoBins'].map((col) => (
                <th key={col} style={{ textAlign: 'left', padding: '10px 20px', fontSize: '11px', color: '#2d4038', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: ff }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '56px 20px', textAlign: 'center' }}>
                  <RiGroupLine size={36} style={{ color: '#1e3a2a', margin: '0 auto 10px', display: 'block' }} />
                  <p style={{ margin: 0, color: '#3a5445', fontSize: '13.5px', fontWeight: '600', fontFamily: ff }}>Sin usuarios registrados</p>
                  <p style={{ margin: '4px 0 0', color: '#1e3a2a', fontSize: '12px', fontFamily: ff }}>
                    Los usuarios aparecerán cuando el endpoint /users esté disponible
                  </p>
                </td>
              </tr>
            ) : (
              users.map((u, i, arr) => (
                <tr key={u.id} style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(16,185,129,0.05)' : 'none' }}>
                  <td style={{ padding: '12px 20px', color: '#c8ddd4', fontSize: '13px', fontFamily: ff }}>
                    {u.firstname} {u.lastname}
                  </td>
                  <td style={{ padding: '12px 20px', color: '#3a5445', fontSize: '13px', fontFamily: ff }}>{u.username}</td>
                  <td style={{ padding: '12px 20px' }}>
                    <span
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        padding: '3px 9px',
                        borderRadius: '999px',
                        fontSize: '11px', fontWeight: '600', fontFamily: ff,
                        background: u.role === 'ADMIN' ? 'rgba(167,139,250,0.1)' : 'rgba(96,165,250,0.1)',
                        border: u.role === 'ADMIN' ? '1px solid rgba(167,139,250,0.25)' : '1px solid rgba(96,165,250,0.25)',
                        color: u.role === 'ADMIN' ? '#c4b5fd' : '#93c5fd',
                      }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '12px 20px', color: '#34d399', fontSize: '13px', fontWeight: '600', fontFamily: ffMono }}>
                    {u.cobins}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
