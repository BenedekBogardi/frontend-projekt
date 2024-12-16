import { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password, email);
      navigate('/protected'); // Sikeres bejelentkezés után navigálás a privát oldalra
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Felhasználónév"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Jelszó"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <input
        type="email"
        placeholder="E-mail cím"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <button type="submit">Bejelentkezés</button>
    </form>
  );
}

export default Login;
