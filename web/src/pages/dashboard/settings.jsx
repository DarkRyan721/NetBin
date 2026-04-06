import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Input, Button, Chip } from '@nextui-org/react';
import { RiUserLine, RiShieldLine, RiGlobalLine } from '@remixicon/react';
import { API_BASE_URL, API_URL_FROM_ENV } from '../../config/env';

function SectionCard({ icon, title, children }) {
  return (
    <div className="nb-panel p-6 rounded-2xl">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-emerald-300/70">{icon}</span>
        <h3 className="text-emerald-50 font-semibold text-sm tracking-wide">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Phase 3: PUT /user/profile
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="space-y-1">
        <h2 className="text-emerald-50 font-semibold text-lg">Configuración</h2>
        <p className="text-emerald-100/45 text-sm">Gestiona tu cuenta y preferencias del sistema</p>
      </div>

      <SectionCard icon={<RiUserLine size={17} />} title="Información de Perfil">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nombre"
              defaultValue={user?.firstname ?? ''}
              variant="bordered"
              classNames={{
                label: 'text-gray-400 text-xs',
                input: 'text-white',
                inputWrapper: ['bg-white/[0.03]', 'border-gray-700', 'focus-within:!border-emerald-500/60'],
              }}
            />
            <Input
              label="Apellido"
              defaultValue={user?.lastname ?? ''}
              variant="bordered"
              classNames={{
                label: 'text-gray-400 text-xs',
                input: 'text-white',
                inputWrapper: ['bg-white/[0.03]', 'border-gray-700', 'focus-within:!border-emerald-500/60'],
              }}
            />
          </div>
          <Input
            label="Correo electrónico"
            defaultValue={user?.username ?? ''}
            isDisabled
            variant="bordered"
            description="El correo no puede modificarse"
            classNames={{
              label: 'text-gray-500 text-xs',
              input: 'text-gray-500',
              inputWrapper: ['bg-white/[0.01]', 'border-gray-800'],
              description: 'text-gray-700 text-xs',
            }}
          />
        </div>
        <div className="flex items-center gap-3 mt-5">
          <Button
            size="sm"
            className="uiverse-btn bg-emerald-500/90 hover:bg-emerald-400 text-emerald-950 font-semibold h-9 shadow-lg shadow-emerald-500/20"
            onPress={handleSave}
          >
            Guardar cambios
          </Button>
          {saved && (
            <Chip size="sm" color="success" variant="flat" radius="sm">
              Guardado
            </Chip>
          )}
        </div>
      </SectionCard>

      <SectionCard icon={<RiShieldLine size={17} />} title="Información de Cuenta">
        <div className="space-y-1">
          {[
            { label: 'Rol', value: user?.role ?? '—' },
            { label: 'CoBins acumulados', value: String(user?.cobins ?? 0) },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between py-2.5 border-b border-gray-800 last:border-0"
            >
              <p className="text-emerald-100/45 text-sm">{label}</p>
              <p className="text-emerald-50 text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {import.meta.env.DEV && (
        <SectionCard icon={<RiGlobalLine size={17} />} title="Entorno (desarrollo)">
          <div>
            <div className="flex items-center justify-between py-2">
              <p className="text-gray-600 text-xs font-mono">VITE_API_URL</p>
              <p className="text-gray-400 text-xs font-mono">{API_BASE_URL}</p>
            </div>
            {!API_URL_FROM_ENV && (
              <p className="text-amber-300/80 text-xs mt-1">
                Usando fallback local (define VITE_API_URL en tu entorno).
              </p>
            )}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
