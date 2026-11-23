import { Link } from "react-router";

export default function WelcomePage() {
  return (
    <div className="welcome-page">
      <h1>EVENTAGRAM</h1>

      <p>Welcome to Eventagram</p>

      <div className="welcome-buttons">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
