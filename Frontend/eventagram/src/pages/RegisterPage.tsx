import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { register, login } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await register(name, email, password);
      await login(email, password);
      navigate("/main");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>EVENTAGRAM</h1>
        <p>Create your account</p>
        <p>Discover events. Meet people. Make memories.</p>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Create Account</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
