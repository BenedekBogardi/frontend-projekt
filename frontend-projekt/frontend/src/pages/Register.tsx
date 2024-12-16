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
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
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
      <button type="submit">Regisztrálok</button>
    </form>
  );
}


export default Register;
