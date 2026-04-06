import React, { useState } from 'react';
import { RiCpuLine, RiRefreshLine } from '@remixicon/react';

const ff     = "'Outfit', system-ui, sans-serif";
const ffMono = "'JetBrains Mono', monospace";

const panelStyle = {
  borderRadius: '18px',
  background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
  border: '1px solid rgba(15,23,42,0.10)',
  overflow: 'hidden',
};

export default function SensorsPage() {
  const [nodeFilter, setNodeFilter] = useState('');
  const sensors = [];

  const reporting = sensors.filter((s) => !!s.sensor_data).length;
  const silent    = sensors.length - reporting;

  const stats = [
    { label: 'Total Sensores', value: sensors.length, color: '#0f172a' },
    { label: 'Reportando',     value: reporting,       color: '#059669' },
    { label: 'Sin señal',      value: silent,          color: '#b45309' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: 0, color: '#0f172a', fontWeight: '700', fontSize: '18px', fontFamily: ff, letterSpacing: '-0.015em' }}>
            Sensores
          </h2>
          <p style={{ margin: '3px 0 0', color: '#475569', fontSize: '13px', fontFamily: ff }}>
            Monitoreo de sensores conectados a la red
          </p>
        </div>
        <button
          className="nb-btn"
          style={{
            color: '#334155',
          }}
        >
          <RiRefreshLine size={14} />
          Actualizar
        </button>
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

      {/* Table */}
      <div style={panelStyle}>
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: '1px solid rgba(15,23,42,0.08)',
          }}
        >
          <p style={{ margin: 0, color: '#0f172a', fontWeight: '600', fontSize: '14px', fontFamily: ff }}>
            Registros de Sensores
          </p>
          <select
            value={nodeFilter}
            onChange={(e) => setNodeFilter(e.target.value)}
            className="nb-select"
            style={{ minWidth: '210px' }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(16,185,129,0.35)'; }}
            onBlur={(e)  => { e.target.style.borderColor = 'rgba(16,185,129,0.1)'; }}
          >
            <option value="" style={{ background: '#ffffff', color: '#0f172a' }}>Todos los nodos</option>
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(15,23,42,0.08)' }}>
              {['ID', 'Nodo', 'Tipo', 'Valor', 'Timestamp'].map((col) => (
                <th
                  key={col}
                  style={{
                    textAlign: 'left', padding: '10px 20px',
                    fontSize: '11px', color: '#64748b',
                    fontWeight: '700', textTransform: 'uppercase',
                    letterSpacing: '0.08em', fontFamily: ff,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sensors.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '56px 20px', textAlign: 'center' }}>
                  <RiCpuLine size={36} style={{ color: '#94a3b8', margin: '0 auto 10px', display: 'block' }} />
                  <p style={{ margin: 0, color: '#475569', fontSize: '13.5px', fontWeight: '600', fontFamily: ff }}>Sin datos de sensores</p>
                  <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '12px', fontFamily: ff }}>
                    Los registros aparecerán aquí cuando el endpoint esté disponible
                  </p>
                </td>
              </tr>
            ) : (
              sensors.map((s, i, arr) => (
                <tr
                  key={s.sensor_id}
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(15,23,42,0.06)' : 'none' }}
                >
                  <td style={{ padding: '12px 20px', color: '#64748b', fontSize: '12.5px', fontFamily: ffMono }}>#{s.sensor_id}</td>
                  <td style={{ padding: '12px 20px', color: '#0f172a', fontSize: '13px', fontFamily: ff }}>{s.nodeName}</td>
                  <td style={{ padding: '12px 20px', color: '#475569', fontSize: '13px', fontFamily: ff }}>{s.sensor_type}</td>
                  <td style={{ padding: '12px 20px', color: '#059669', fontSize: '13px', fontFamily: ffMono }}>{s.sensor_data}</td>
                  <td style={{ padding: '12px 20px', color: '#64748b', fontSize: '11.5px', fontFamily: ffMono }}>{s.timestamp}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
