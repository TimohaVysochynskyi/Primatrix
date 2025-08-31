import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AuthProvider from "./components/auth/AuthProvider";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("./pages/AuthPages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/AuthPages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
