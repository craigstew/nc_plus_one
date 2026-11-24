import { UserRound } from "lucide-react";
import { Link } from "react-router";

export default function Header() {
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
      </div>
    </header>
  );
}
