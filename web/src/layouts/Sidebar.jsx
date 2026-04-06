import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  RiDashboardLine,
  RiMapPinLine,
  RiCpuLine,
  RiRecycleLine,
  RiGroupLine,
  RiSettings3Line,
  RiMenuLine,
  RiArrowLeftSLine,
} from '@remixicon/react';

const NAV_ITEMS = [
  { label: 'Resumen',  Icon: RiDashboardLine, path: '/dashboard/overview' },
  { label: 'Nodos',    Icon: RiMapPinLine,    path: '/dashboard/nodes'    },
  { label: 'Sensores', Icon: RiCpuLine,       path: '/dashboard/sensors'  },
  { label: 'Residuos', Icon: RiRecycleLine,   path: '/dashboard/waste'    },
  { label: 'Usuarios', Icon: RiGroupLine,     path: '/dashboard/users'    },
  { label: 'Ajustes',  Icon: RiSettings3Line, path: '/dashboard/settings' },
];

export default function AppSidebar({ collapsed, setCollapsed }) {
  const navigate   = useNavigate();
  const { pathname } = useLocation();

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor="transparent"
      width="220px"
      collapsedWidth="64px"
      rootStyles={{
        background: 'linear-gradient(180deg, rgba(13,24,18,0.95) 0%, rgba(7,15,11,0.98) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        height: '100vh',
        position: 'sticky',
        top: 0,
        flexShrink: 0,
        boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.02), 16px 0 42px -36px rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          height: '64px',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 14px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '10px',
                background: 'linear-gradient(160deg, rgba(16,185,129,0.2), rgba(16,185,129,0.07))',
                border: '1px solid rgba(16,185,129,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 14px 26px -18px rgba(16,185,129,0.85)',
              }}
            >
              <RiRecycleLine size={15} style={{ color: '#34d399' }} />
            </div>
            <span
              style={{
                color: '#ddeee5',
                fontWeight: '700',
                fontSize: '15px',
                letterSpacing: '0.01em',
                fontFamily: "'Outfit', system-ui, sans-serif",
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              NetBin
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="nb-btn"
          style={{
            width: '32px',
            height: '32px',
            padding: 0,
            marginLeft: 'auto',
          }}
        >
          {collapsed
            ? <RiMenuLine size={16} />
            : <RiArrowLeftSLine size={16} />
          }
        </button>
      </div>

      {/* Section label */}
      {!collapsed && (
        <p
          style={{
            padding: '20px 18px 8px',
            margin: 0,
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#2d4038',
            fontFamily: "'Outfit', system-ui, sans-serif",
          }}
        >
          Plataforma
        </p>
      )}

      {/* Navigation */}
      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            height: '40px',
            margin: '4px 8px',
            borderRadius: '11px',
            border: `1px solid ${active ? 'rgba(16,185,129,0.34)' : 'transparent'}`,
            backgroundColor: active ? 'rgba(16,185,129,0.15)' : 'transparent',
            boxShadow: active ? '0 14px 26px -22px rgba(16,185,129,0.95)' : 'none',
            color: active ? '#9efad4' : '#638773',
            fontSize: '13.5px',
            fontWeight: active ? '600' : '400',
            fontFamily: "'Outfit', system-ui, sans-serif",
            paddingLeft: collapsed ? '0px' : '10px',
            transition: 'all 0.22s ease',
            '&:hover': {
              backgroundColor: active
                ? 'rgba(16,185,129,0.20)'
                : 'rgba(255,255,255,0.05)',
              color: active ? '#c6ffe8' : '#b6d4c5',
              borderColor: active ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.1)',
            },
          }),
          icon: ({ active }) => ({
            color: active ? '#10b981' : '#2d4038',
            minWidth: collapsed ? '64px' : '32px',
            display: 'flex',
            justifyContent: collapsed ? 'center' : 'flex-start',
            transition: 'color 0.18s ease',
          }),
        }}
      >
        {NAV_ITEMS.map(({ label, Icon, path }) => (
          <MenuItem
            key={path}
            icon={<Icon size={16} />}
            active={pathname === path}
            onClick={() => navigate(path)}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>

      {/* Footer */}
      {!collapsed && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '14px',
            borderTop: '1px solid rgba(16,185,129,0.06)',
          }}
        >
          <div
            style={{
              borderRadius: '10px',
              background: 'rgba(16,185,129,0.04)',
              border: '1px solid rgba(16,185,129,0.1)',
              padding: '10px 12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 0 2px rgba(16,185,129,0.2)',
                  animation: 'nb-breathe 2s ease-in-out infinite',
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: '11.5px',
                  fontWeight: '600',
                  color: '#34d399',
                  fontFamily: "'Outfit', system-ui, sans-serif",
                }}
              >
                NetBin IoT v1.0
              </p>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '10.5px',
                color: '#2d4038',
                fontFamily: "'Outfit', system-ui, sans-serif",
              }}
            >
              Plataforma de gestión
            </p>
          </div>
        </div>
      )}
    </Sidebar>
  );
}
