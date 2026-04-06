import React from 'react';
import { RiRecycleLine, RiFilterLine, RiLeafLine } from '@remixicon/react';
import { Badge } from '@tremor/react';

const ff     = "'Outfit', system-ui, sans-serif";
const ffMono = "'JetBrains Mono', monospace";

const panelStyle = {
  borderRadius: '18px',
  background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
  border: '1px solid rgba(15,23,42,0.10)',
  overflow: 'hidden',
};

export default function WastePage() {
  const waste = [];

  const recyclable    = waste.filter((w) => w.type === 'RECICLABLE').length;
  const nonRecyclable = waste.filter((w) => w.type === 'NO_RECICLABLE').length;

  const stats = [
    { label: 'Total Registros', value: waste.length, color: '#0f172a' },
    { label: 'Reciclables',     value: recyclable,    color: '#059669' },
    { label: 'No Reciclables',  value: nonRecyclable, color: '#c2410c' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      <div>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: '700', fontSize: '18px', fontFamily: ff, letterSpacing: '-0.015em' }}>
          Registro de Residuos
        </h2>
        <p style={{ margin: '3px 0 0', color: '#475569', fontSize: '13px', fontFamily: ff }}>
          Historial de clasificaciones realizadas por IA
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        {stats.map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              borderRadius: '12px',
              background: '#ffffff',
              border: '1px solid rgba(15,23,42,0.10)',
              padding: '16px 18px',
            }}
          >
            <p style={{ margin: 0, fontFamily: ffMono, fontSize: '26px', fontWeight: '600', color, lineHeight: 1.1 }}>{value}</p>
            <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#475569', fontFamily: ff }}>{label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
        {/* Waste table */}
        <div style={panelStyle}>
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 20px',
              borderBottom: '1px solid rgba(15,23,42,0.08)',
            }}
          >
            <p style={{ margin: 0, color: '#0f172a', fontWeight: '600', fontSize: '14px', fontFamily: ff }}>
              Historial
            </p>
            <button
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px', height: '34px',
              }}
              className="nb-btn"
            >
              <RiFilterLine size={12} />
              Filtrar
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(15,23,42,0.08)' }}>
                {['Item Detectado', 'Clasificación', 'Usuario', 'Fecha'].map((col) => (
                  <th key={col} style={{ textAlign: 'left', padding: '10px 20px', fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: ff }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {waste.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '56px 20px', textAlign: 'center' }}>
                    <RiRecycleLine size={36} style={{ color: '#94a3b8', margin: '0 auto 10px', display: 'block' }} />
                    <p style={{ margin: 0, color: '#475569', fontSize: '13.5px', fontWeight: '600', fontFamily: ff }}>Sin registros de residuos</p>
                    <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '12px', fontFamily: ff }}>Las clasificaciones aparecerán cuando el endpoint esté disponible</p>
                  </td>
                </tr>
              ) : (
                waste.map((w, i, arr) => (
                  <tr key={w.waste_id} style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(15,23,42,0.06)' : 'none' }}>
                    <td style={{ padding: '12px 20px', color: '#0f172a', fontSize: '13px', fontFamily: ff }}>{w.recognized_item}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <Badge color={w.type === 'RECICLABLE' ? 'emerald' : 'orange'} size="xs">{w.type}</Badge>
                    </td>
                    <td style={{ padding: '12px 20px', color: '#475569', fontSize: '13px', fontFamily: ff }}>{w.username ?? '—'}</td>
                    <td style={{ padding: '12px 20px', color: '#64748b', fontSize: '11.5px', fontFamily: ffMono }}>{w.timestamp}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Distribution panel */}
        <div style={{ ...panelStyle, padding: '20px' }}>
          <p style={{ margin: 0, color: '#0f172a', fontWeight: '600', fontSize: '14px', fontFamily: ff }}>Distribución</p>
          <p style={{ margin: '3px 0 0', color: '#64748b', fontSize: '11.5px', fontFamily: ff }}>Por tipo de residuo</p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 10px', textAlign: 'center' }}>
            <div
              style={{
                width: '64px', height: '64px',
                borderRadius: '50%',
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '12px',
              }}
            >
              <RiLeafLine size={26} style={{ color: '#64748b' }} />
            </div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '13px', fontWeight: '600', fontFamily: ff }}>Gráfico disponible</p>
            <p style={{ margin: '5px 0 0', color: '#94a3b8', fontSize: '11.5px', fontFamily: ff, lineHeight: 1.5 }}>
              con datos del<br />servidor (Fase 3)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
