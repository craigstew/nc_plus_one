import { UserRound, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="header-brand">
        <Link to="/main" className="header-logo">
          EVENTAGRAM
        </Link>

        <nav className="header-nav">
          <Link to="/main">Home</Link>
        </nav>
      </div>

      <div className="header-profile">
        <Link to="/profile">
          <UserRound size={18} strokeWidth={2} />
          <span>Profile</span>
        </Link>

        <button onClick={handleLogout} className="header-logout">
          <LogOut size={18} strokeWidth={2} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
