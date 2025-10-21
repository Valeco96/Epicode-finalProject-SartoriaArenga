import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { login } from "../data/auth";
import { Form } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      //rimuove il query dall'URL
      alert("Login effettuato.");
      window.history.replace({}, document.title, "/");
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      setMessage("Login effettuato.");
      navigate("/admin-storico-lavori");
    } catch (error) {
      setMessage("Email o password non corretti.");
    }
  };

  return (
    <>
      <div className="wrapper">
        <h2>Accedi</h2>
        {message && <p>{message}</p>}
        <Form onSubmit={handleSubmit}>
          <div className="my-3">
            <Form.Label className="form-label">Email:</Form.Label>
            <Form.Control
              className="form-cell"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="my-3">
            <Form.Label className="form-label">Password:</Form.Label>
            <Form.Control
              className="mb-4"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-outline-primary" type="submit">
              Entra
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login;
