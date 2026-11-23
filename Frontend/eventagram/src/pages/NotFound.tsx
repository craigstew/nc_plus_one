import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <h1>404</h1>

        <h2>Oops! Page not found.</h2>

        <p>The page you're looking for doesn't exist or may have been moved.</p>

        <Link to="/" className="notfound-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
