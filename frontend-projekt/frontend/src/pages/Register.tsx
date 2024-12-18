import { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email)
    try {
      await register(username, password, email);
      navigate('/protected');
    } catch (error) {
      alert('Sikertelen regisztráció!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5 p-4 border rounded shadow-sm">
      <div className="d-flex justify-content-end mb-3">
      <a href="/login" className="btn btn-primary me-2">
                    Bejelentkezés
                </a>
                <a href="/" className="btn btn-success">
                    Vissza a főoldalra
                </a>
      </div>
      <h2 className="text-center mb-4">Regisztráció</h2>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Felhasználónév</label>
        <input
          type="text"
          id="username"
          className="form-control"
          placeholder="Felhasználónév"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Jelszó</label>
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="form-label">E-mail cím</label>
        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="E-mail cím"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary px-5">Regisztrálok</button>
      </div>
    </form>

  );
}


export default Register;
