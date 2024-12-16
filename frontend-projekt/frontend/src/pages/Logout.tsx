import { useEffect } from 'react';
import { logout } from '../api';
import { useNavigate } from 'react-router';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        alert('Logout failed');
      }
    };

    handleLogout();
  }, [navigate]);

  return <h2>Logging out...</h2>;
}

export default Logout;
//faaz
