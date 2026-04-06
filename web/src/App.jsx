import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './router/PrivateRoute';
import './App.css';

const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const WelcomePage = lazy(() => import('./pages/welcome'));
const LoginPage = lazy(() => import('./pages/login'));
const OverviewPage = lazy(() => import('./pages/dashboard/overview'));
const NodesPage = lazy(() => import('./pages/dashboard/nodes'));
const SensorsPage = lazy(() => import('./pages/dashboard/sensors'));
const WastePage = lazy(() => import('./pages/dashboard/waste'));
const UsersPage = lazy(() => import('./pages/dashboard/users'));
const SettingsPage = lazy(() => import('./pages/dashboard/settings'));

function RouteLoader() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: 'var(--nb-t2)' }}>
      Cargando…
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Dashboard — rutas protegidas */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview"  element={<OverviewPage />} />
              <Route path="nodes"     element={<NodesPage />} />
              <Route path="sensors"   element={<SensorsPage />} />
              <Route path="waste"     element={<WastePage />} />
              <Route path="users"     element={<UsersPage />} />
              <Route path="settings"  element={<SettingsPage />} />
            </Route>

            {/* Redirecciones de compatibilidad */}
            <Route path="/home" element={<Navigate to="/dashboard/overview" replace />} />
            <Route path="*"     element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}
