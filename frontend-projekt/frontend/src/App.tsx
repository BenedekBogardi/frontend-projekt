import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Products from './pages/Products';
import Protected from './pages/Protected';
import Profile from './pages/Profile';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/products" element={<Products />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App
