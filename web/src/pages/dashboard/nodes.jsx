import React, { useState } from 'react';
import { RiMapPinLine, RiAddLine, RiRefreshLine } from '@remixicon/react';

/* ── Shared styles ──────────────────────────────────────────── */
const ff = "'Outfit', system-ui, sans-serif";
const ffMono = "'JetBrains Mono', monospace";

const panelStyle = {
  borderRadius: '18px',
  background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
  border: '1px solid rgba(15,23,42,0.10)',
  overflow: 'hidden',
  boxShadow: '0 12px 28px -22px rgba(15,23,42,0.28)',
};

const statCardStyle = (textColor) => ({
  borderRadius: '16px',
  background: '#ffffff',
  border: '1px solid rgba(15,23,42,0.10)',
  padding: '16px 18px',
  boxShadow: '0 10px 24px -22px rgba(15,23,42,0.25)',
});

function ActionButton({ onClick, variant = 'default', icon, children }) {
  const styles = {
    default: {
      background: '#ffffff',
      border: '1px solid rgba(148,163,184,0.45)',
      color: '#334155',
      hoverBg: '#f8fafc',
      hoverColor: '#0f172a',
      hoverBorder: 'rgba(100,116,139,0.55)',
    },
    primary: {
      background: 'rgba(16,185,129,0.12)',
      border: '1px solid rgba(16,185,129,0.32)',
      color: '#065f46',
      hoverBg: 'rgba(16,185,129,0.18)',
      hoverColor: '#064e3b',
      hoverBorder: 'rgba(16,185,129,0.46)',
    },
  };
  const s = styles[variant];
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`nb-btn ${variant === 'primary' ? 'nb-btn-primary' : ''}`}
      style={{
        height: '38px',
        borderRadius: '11px',
        border: hov ? s.hoverBorder : s.border,
        background: hov ? s.hoverBg : s.background,
        color: hov ? s.hoverColor : s.color,
        fontFamily: ff,
        fontSize: '13px',
        cursor: 'pointer',
      }}
    >
      {icon}
      {children}
    </button>
  );
}

export default function NodesPage() {
  const [search, setSearch] = useState('');
  const nodes = [];

  const active   = nodes.filter((n) => n.status === 'ACTIVE').length;
  const inactive = nodes.filter((n) => n.status !== 'ACTIVE').length;

  const stats = [
    { label: 'Total nodos', value: nodes.length, color: '#0f172a' },
    { label: 'Activos',     value: active,        color: '#059669' },
    { label: 'Inactivos',   value: inactive,      color: '#dc2626' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: 0, color: '#0f172a', fontWeight: '700', fontSize: '18px', fontFamily: ff, letterSpacing: '-0.015em' }}>
            Nodos IoT
          </h2>
          <p style={{ margin: '3px 0 0', color: '#475569', fontSize: '13px', fontFamily: ff }}>
            Gestiona los nodos de la red NetBin
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <ActionButton icon={<RiRefreshLine size={14} />} variant="default">Actualizar</ActionButton>
          <ActionButton icon={<RiAddLine size={14} />}     variant="primary">Nuevo Nodo</ActionButton>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        {stats.map(({ label, value, color }) => (
          <div key={label} style={statCardStyle(color)}>
            <p style={{ margin: 0, fontFamily: ffMono, fontSize: '26px', fontWeight: '600', color, lineHeight: 1.1 }}>
              {value}
            </p>
            <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#475569', fontFamily: ff }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={panelStyle}>
        {/* Table header */}
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: '1px solid rgba(15,23,42,0.08)',
          }}
        >
          <p style={{ margin: 0, color: '#0f172a', fontWeight: '600', fontSize: '14px', fontFamily: ff }}>
            Lista de Nodos
          </p>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar nodo..."
            className="nb-input"
            style={{ width: '220px' }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(16,185,129,0.35)';
              e.target.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(16,185,129,0.1)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(15,23,42,0.08)' }}>
              {['ID', 'Nombre', 'Estado', 'Ubicación'].map((col) => (
                <th
                  key={col}
                  style={{
                    textAlign: 'left',
                    padding: '10px 20px',
                    fontSize: '11px',
                    color: '#64748b',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontFamily: ff,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nodes.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '56px 20px', textAlign: 'center' }}>
                  <RiMapPinLine size={36} style={{ color: '#94a3b8', margin: '0 auto 10px', display: 'block' }} />
                  <p style={{ margin: 0, color: '#475569', fontSize: '13.5px', fontWeight: '600', fontFamily: ff }}>Sin nodos registrados</p>
                  <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '12px', fontFamily: ff }}>
                    Los nodos aparecerán aquí una vez conectados al sistema
                  </p>
                </td>
              </tr>
            ) : (
              nodes
                .filter((n) =>
                  n.node_name?.toLowerCase().includes(search.toLowerCase()) ||
                  n.location?.toLowerCase().includes(search.toLowerCase())
                )
                .map((node, i, arr) => (
                  <tr
                    key={node.node_id}
                    style={{
                      borderBottom: i < arr.length - 1 ? '1px solid rgba(15,23,42,0.06)' : 'none',
                    }}
                  >
                    <td style={{ padding: '12px 20px', color: '#64748b', fontSize: '12.5px', fontFamily: ffMono }}>
                      #{node.node_id}
                    </td>
                    <td style={{ padding: '12px 20px', color: '#0f172a', fontSize: '13px', fontFamily: ff }}>
                      {node.node_name}
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '3px 9px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: '600',
                          fontFamily: ff,
                          background: node.status === 'ACTIVE' ? 'rgba(16,185,129,0.1)' : 'rgba(248,113,113,0.1)',
                          border: node.status === 'ACTIVE' ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(248,113,113,0.25)',
                          color: node.status === 'ACTIVE' ? '#059669' : '#dc2626',
                        }}
                      >
                        <span
                          style={{
                            width: '5px', height: '5px',
                            borderRadius: '50%',
                            background: node.status === 'ACTIVE' ? '#10b981' : '#dc2626',
                            flexShrink: 0,
                          }}
                        />
                        {node.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 20px', color: '#475569', fontSize: '13px', fontFamily: ff }}>
                      {node.location}
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
