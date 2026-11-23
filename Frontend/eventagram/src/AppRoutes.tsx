import { Routes, Route } from "react-router";

import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// import Layout from "./components/Layout";
// import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* <Route element={<Layout />}>
        <Route path="/home" element={<MainPage />} />
      </Route> */}

        <Route element={<ProtectedRoute />}>
          <Route path="/main" element={<MainPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
