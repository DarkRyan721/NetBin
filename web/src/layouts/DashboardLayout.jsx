import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="nb-shell"
      style={{
        display: 'flex',
        height: '100vh',
        background: 'radial-gradient(120% 120% at 10% -10%, rgba(16,185,129,0.08) 0%, transparent 45%), var(--nb-bg, #07100d)',
        overflow: 'hidden',
        fontFamily: "'Outfit', system-ui, sans-serif",
      }}
    >
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, overflow: 'hidden', background: '#ffffff' }}>
        <Topbar />
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 24px 28px',
            boxSizing: 'border-box',
            background: '#ffffff',
            color: '#0f172a',
            fontFamily: "'Outfit', system-ui, sans-serif",
            lineHeight: 1.45,
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto', minHeight: '100%', width: '100%', background: '#ffffff' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
