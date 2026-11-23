import { Routes, Route } from "react-router";

import WelcomePage from "./pages/WelcomePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";

// import Layout from "./components/Layout";
// import MainPage from "./pages/MainPage";
// import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Pages without the layout */}
      <Route path="/" element={<WelcomePage />} />
      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} /> */}

      {/* Pages with the layout */}
      {/* <Route element={<Layout />}>
        <Route path="/home" element={<MainPage />} />
      </Route> */}

      {/* 404 page */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
