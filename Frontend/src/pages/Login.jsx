import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      login(email, password);

      navigate("/admin-storico-lavori");
      alert("Login effettuato.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-container">
          <h2 className="fw-bold mb-4">Accedi</h2>
          <Form onSubmit={handleSubmit}>
            <div className="my-3">
              <Form.Label className="form-label fw-bold">Email:</Form.Label>
              <Form.Control
                className="form-cell"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <Form.Label className="form-label fw-bold">Password:</Form.Label>
              <Form.Control
                className="mb-4"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p variant="danger">{error}</p>}

            <div className="d-grid gap-2">
              <button
                className="btn btn-outline-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Caricamento..." : "Login"}
              </button>
            </div>
          </Form>
        </div>
      </div>
      <div className="footer-height-fixer"></div>
    </>
  );
}

export default Login;
