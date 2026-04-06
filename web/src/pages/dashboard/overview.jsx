import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMqttSub } from '../../hooks/useMqtt';
import mqttClient from '../../mqtt/mqttClient';
import {
  AreaChart,
  BarList,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Badge,
} from '@tremor/react';
import {
  RiLeafLine,
  RiRecycleLine,
  RiCpuLine,
  RiCoinLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiWifiLine,
  RiWifiOffLine,
  RiLockLine,
  RiLockUnlockLine,
} from '@remixicon/react';

/* ── Palette map ───────────────────────────────────────────────── */
const PALETTE = {
  emerald: {
    accent: '#10b981', lt: '#34d399',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.18)',
    glow: 'rgba(16,185,129,0.40)',
    icon: 'rgba(16,185,129,0.12)',
  },
  blue: {
    accent: '#60a5fa', lt: '#93c5fd',
    bg: 'rgba(96,165,250,0.06)',
    border: 'rgba(96,165,250,0.18)',
    glow: 'rgba(96,165,250,0.38)',
    icon: 'rgba(96,165,250,0.12)',
  },
  amber: {
    accent: '#f59e0b', lt: '#fcd34d',
    bg: 'rgba(245,158,11,0.06)',
    border: 'rgba(245,158,11,0.18)',
    glow: 'rgba(245,158,11,0.38)',
    icon: 'rgba(245,158,11,0.12)',
  },
  violet: {
    accent: '#a78bfa', lt: '#c4b5fd',
    bg: 'rgba(167,139,250,0.06)',
    border: 'rgba(167,139,250,0.18)',
    glow: 'rgba(167,139,250,0.38)',
    icon: 'rgba(167,139,250,0.12)',
  },
};

/* ── KPI Card ──────────────────────────────────────────────────── */
function KpiCard({ icon, label, value, unit, color, delta }) {
  const p = PALETTE[color] ?? PALETTE.emerald;

  return (
    <div
      className="nb-a1"
      style={{
        position: 'relative',
        borderRadius: '14px',
        background: `linear-gradient(145deg, ${p.bg} 0%, rgba(7,16,13,0) 100%)`,
        border: `1px solid ${p.border}`,
        padding: '20px',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${p.accent} 0%, transparent 65%)`,
        }}
      />

      {/* Icon + delta row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div
          style={{
            width: '40px', height: '40px',
            borderRadius: '11px',
            background: p.icon,
            border: `1px solid ${p.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 20px -8px ${p.glow}`,
            color: p.accent,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        {delta !== undefined && (
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: '3px',
              fontSize: '11px', fontWeight: '600',
              color: delta >= 0 ? '#34d399' : '#f87171',
              background: delta >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(248,113,113,0.1)',
              border: `1px solid ${delta >= 0 ? 'rgba(16,185,129,0.2)' : 'rgba(248,113,113,0.2)'}`,
              borderRadius: '6px',
              padding: '3px 7px',
            }}
          >
            {delta >= 0 ? <RiArrowUpLine size={10} /> : <RiArrowDownLine size={10} />}
            {Math.abs(delta)}%
          </div>
        )}
      </div>

      {/* Value + label */}
      <div>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '28px',
            fontWeight: '600',
            color: '#e2ede8',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.5px',
          }}
        >
          {value}
          {unit && (
            <span
              style={{
                fontSize: '13px',
                fontWeight: '400',
                color: p.lt,
                marginLeft: '5px',
                fontFamily: "'Outfit', system-ui, sans-serif",
              }}
            >
              {unit}
            </span>
          )}
        </p>
        <p style={{ fontSize: '12px', color: '#3a5445', margin: '5px 0 0', fontFamily: "'Outfit', system-ui, sans-serif" }}>
          {label}
        </p>
      </div>
    </div>
  );
}

/* ── Panel wrapper ─────────────────────────────────────────────── */
const Panel = ({ children, style = {} }) => (
  <div
    style={{
      borderRadius: '14px',
      background: 'linear-gradient(145deg, rgba(16,185,129,0.03) 0%, rgba(7,16,13,0) 70%)',
      border: '1px solid rgba(16,185,129,0.1)',
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);

const PanelHeader = ({ title, subtitle, right }) => (
  <div
    style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 20px 14px',
      borderBottom: '1px solid rgba(16,185,129,0.07)',
    }}
  >
    <div>
      <p style={{ margin: 0, color: '#c8ddd4', fontWeight: '600', fontSize: '14px', fontFamily: "'Outfit', system-ui, sans-serif" }}>
        {title}
      </p>
      {subtitle && (
        <p style={{ margin: '2px 0 0', color: '#2d4038', fontSize: '11.5px', fontFamily: "'Outfit', system-ui, sans-serif" }}>
          {subtitle}
        </p>
      )}
    </div>
    {right}
  </div>
);

/* ── Gate toggle button ────────────────────────────────────────── */
function GateButton({ label, desc, icon, isOpen, onClick, colorScheme }) {
  const colors = {
    emerald: {
      open:   { bg: 'rgba(16,185,129,0.09)', border: 'rgba(16,185,129,0.28)', text: '#34d399', led: '#10b981', badge: 'rgba(16,185,129,0.14)' },
      closed: { bg: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.06)', text: '#3a5445', led: '#1e3a2a', badge: 'rgba(255,255,255,0.05)' },
    },
    blue: {
      open:   { bg: 'rgba(96,165,250,0.09)', border: 'rgba(96,165,250,0.28)', text: '#93c5fd', led: '#60a5fa', badge: 'rgba(96,165,250,0.14)' },
      closed: { bg: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.06)', text: '#3a5445', led: '#1a2a38', badge: 'rgba(255,255,255,0.05)' },
    },
  };
  const c = (colors[colorScheme] ?? colors.emerald)[isOpen ? 'open' : 'closed'];

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 14px',
        borderRadius: '12px',
        border: `1px solid ${c.border}`,
        background: c.bg,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: "'Outfit', system-ui, sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '32px', height: '32px',
            borderRadius: '9px',
            background: isOpen ? c.badge : 'rgba(255,255,255,0.03)',
            border: `1px solid ${c.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: c.text,
            flexShrink: 0,
          }}
        >
          {isOpen ? <RiLockUnlockLine size={14} /> : <RiLockLine size={14} />}
        </div>
        <div style={{ textAlign: 'left' }}>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: c.text }}>{label}</p>
          <p style={{ margin: '1px 0 0', fontSize: '11px', color: '#2d4038' }}>{desc}</p>
        </div>
      </div>

      {/* Status badge with LED */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '4px 9px',
          borderRadius: '999px',
          background: c.badge,
          border: `1px solid ${c.border}`,
        }}
      >
        <div
          style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: c.led,
            boxShadow: isOpen ? `0 0 0 2px ${c.badge}` : 'none',
            animation: isOpen ? 'nb-breathe 1.8s ease-in-out infinite' : 'none',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: '10px', fontWeight: '700',
            color: c.text,
            letterSpacing: '0.06em',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {isOpen ? 'ABIERTA' : 'CERRADA'}
        </span>
      </div>
    </button>
  );
}

/* ── Main component ────────────────────────────────────────────── */
export default function OverviewPage() {
  const { user }   = useAuth();
  const sensorData = useMqttSub('netbin/rasp/bin/sensor/level', 10);
  const aiData     = useMqttSub('netbin/rasp/bin/sensor/AI', 5);

  const [reciclableOpen,   setReciclableOpen]   = useState(false);
  const [noReciclableOpen, setNoReciclableOpen] = useState(false);

  const latest            = sensorData[sensorData.length - 1];
  const reciclableLevel   = latest?.variable   ?? 0;
  const noReciclableLevel = latest?.variable_1 ?? 0;
  const mqttConnected     = mqttClient?.connected ?? false;

  const chartData = useMemo(() =>
    sensorData.map((item, i) => ({
      t:               item.timestamp_1 ?? `T${i + 1}`,
      Reciclable:      item.variable    ?? 0,
      'No Reciclable': item.variable_1  ?? 0,
    })),
  [sensorData]);

  const barData = [
    { name: 'Reciclable',      value: reciclableLevel   },
    { name: 'No Reciclable',   value: noReciclableLevel },
  ];

  const publish = (topic, msg) => {
    if (mqttClient?.connected) mqttClient.publish(topic, msg);
  };

  const handleReciclable = () => {
    const next = !reciclableOpen;
    setReciclableOpen(next);
    publish('netbin/rasp/bin/compuerta_reciclable', next ? 'abrir_reciclable' : 'cerrar_reciclable');
  };

  const handleNoReciclable = () => {
    const next = !noReciclableOpen;
    setNoReciclableOpen(next);
    publish('netbin/rasp/bin/compuerta_no_reciclable', next ? 'abrir_no_reciclable' : 'cerrar_no_reciclable');
  };

  /* Live badge */
  const LiveBadge = () => (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '4px 10px',
        borderRadius: '999px',
        border: `1px solid ${mqttConnected ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.08)'}`,
        background: mqttConnected ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.03)',
      }}
    >
      <div
        style={{
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: mqttConnected ? '#10b981' : '#3a5445',
          animation: mqttConnected ? 'nb-breathe 1.8s ease-in-out infinite' : 'none',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: '11px', fontWeight: '600',
          color: mqttConnected ? '#34d399' : '#3a5445',
          fontFamily: "'Outfit', system-ui, sans-serif",
        }}
      >
        {mqttConnected ? 'En vivo' : 'Desconectado'}
      </span>
    </div>
  );

  /* Empty state */
  const EmptyState = ({ icon, text, sub }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 20px', textAlign: 'center' }}>
      <div style={{ color: '#1e3a2a', marginBottom: '10px' }}>{icon}</div>
      <p style={{ margin: 0, color: '#3a5445', fontSize: '13.5px', fontWeight: '600', fontFamily: "'Outfit', system-ui, sans-serif" }}>{text}</p>
      <p style={{ margin: '4px 0 0', color: '#1e3a2a', fontSize: '11.5px', fontFamily: "'Outfit', system-ui, sans-serif" }}>{sub}</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }} className="lg:grid-cols-4">
        <KpiCard icon={<RiLeafLine size={18} />}    label="Nivel Reciclable"    value={reciclableLevel}   unit="%" color="emerald" />
        <KpiCard icon={<RiRecycleLine size={18} />} label="Nivel No Reciclable" value={noReciclableLevel} unit="%" color="blue"    />
        <KpiCard icon={<RiCoinLine size={18} />}    label="CoBins acumulados"   value={user?.cobins ?? 0}     color="amber"   />
        <KpiCard icon={<RiCpuLine size={18} />}     label="Detecciones IA"      value={aiData.length} unit="recientes" color="violet"  />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }} className="lg:grid-cols-3">

        {/* Area chart */}
        <Panel style={{ gridColumn: 'span 1' }} className="lg:col-span-2">
          <PanelHeader
            title="Niveles de Llenado"
            subtitle="Historial en tiempo real via MQTT"
            right={<LiveBadge />}
          />
          <div style={{ padding: '16px 20px 20px' }}>
            {sensorData.length === 0 ? (
              <EmptyState
                icon={<RiWifiLine size={34} />}
                text="Sin datos de sensor"
                sub="Esperando mensajes MQTT..."
              />
            ) : (
              <AreaChart
                data={chartData}
                index="t"
                categories={['Reciclable', 'No Reciclable']}
                colors={['emerald', 'blue']}
                showLegend
                showYAxis
                showGridLines
                startEndOnly={false}
                fill="gradient"
                className="h-48 mt-1"
              />
            )}
          </div>
        </Panel>

        {/* Bar list */}
        <Panel>
          <PanelHeader title="Distribución Actual" subtitle="Porcentaje de llenado por tipo" />
          <div style={{ padding: '16px 20px 20px' }}>
            <BarList data={barData} valueFormatter={(n) => `${n}%`} />
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(16,185,129,0.07)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                { label: 'Capacidad total', value: `${reciclableLevel + noReciclableLevel}%`, color: '#c8ddd4' },
                { label: 'Disponible',      value: `${Math.max(0, 100 - reciclableLevel - noReciclableLevel)}%`, color: '#34d399' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#3a5445', fontFamily: "'Outfit', system-ui, sans-serif" }}>{label}</span>
                  <span style={{ fontSize: '12.5px', fontWeight: '600', color, fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }} className="lg:grid-cols-3">

        {/* AI detections table */}
        <Panel style={{ gridColumn: 'span 1' }} className="lg:col-span-2">
          <PanelHeader title="Últimas Detecciones de IA" subtitle="Clasificaciones en tiempo real" />
          {aiData.length === 0 ? (
            <EmptyState
              icon={<RiCpuLine size={34} />}
              text="Sin detecciones recientes"
              sub="Esperando datos del sensor AI..."
            />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {['Item', 'Clasificación', 'Timestamp'].map((col) => (
                    <TableHeaderCell key={col} className="text-xs bg-transparent" style={{ color: '#2d4038', fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: '600', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {col}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {aiData.map((item, i) => (
                  <TableRow key={i} className="border-gray-800/50">
                    <TableCell className="py-3" style={{ color: '#c8ddd4', fontSize: '13px', fontFamily: "'Outfit', system-ui, sans-serif" }}>{item.variable_1}</TableCell>
                    <TableCell className="py-3">
                      <Badge
                        color={item.value_1?.toLowerCase().includes('recicl') ? 'emerald' : 'orange'}
                        size="xs"
                      >
                        {item.value_1}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3" style={{ color: '#2d4038', fontSize: '11.5px', fontFamily: "'JetBrains Mono', monospace" }}>{item.timestamp_1}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Panel>

        {/* Gate controls */}
        <Panel>
          <PanelHeader title="Control de Compuertas" subtitle="Apertura y cierre manual" />
          <div style={{ padding: '16px 16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <GateButton
              label="Reciclable"
              desc="Compartimento verde"
              isOpen={reciclableOpen}
              onClick={handleReciclable}
              colorScheme="emerald"
            />
            <GateButton
              label="No Reciclable"
              desc="Compartimento gris"
              isOpen={noReciclableOpen}
              onClick={handleNoReciclable}
              colorScheme="blue"
            />

            {/* MQTT status */}
            <div
              style={{
                marginTop: '8px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(16,185,129,0.07)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: mqttConnected ? '#10b981' : '#1e3a2a',
                  boxShadow: mqttConnected ? '0 0 0 2px rgba(16,185,129,0.2)' : 'none',
                  animation: mqttConnected ? 'nb-breathe 2s ease-in-out infinite' : 'none',
                  flexShrink: 0,
                }}
              />
              <p style={{ margin: 0, fontSize: '11.5px', color: '#2d4038', fontFamily: "'Outfit', system-ui, sans-serif" }}>
                {mqttConnected ? 'Broker MQTT conectado' : 'Broker MQTT desconectado'}
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
