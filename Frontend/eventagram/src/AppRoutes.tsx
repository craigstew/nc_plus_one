import { Routes, Route } from "react-router";

import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./pages/Layout";
import ProfilePage from "./pages/ProfilePage";
import EventDetailsPage from "./pages/EventDetailsPage";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/events/create" element={<CreateEvent />} />
            <Route path="/events/:id/edit" element={<EditEvent />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
