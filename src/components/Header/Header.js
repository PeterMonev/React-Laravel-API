import '../Header/Header.css';
import { useAuth } from '../../hooks/authContext';

import { Link } from 'react-router-dom';

export const Header = () => {
  const { token , logout} = useAuth();

  const handleLogout = () => {
    logout();
  }

    return(
    <header className="header">
      <nav className="nav">
        <ul className="nav__ul">
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          {token && <Link to='/logout' onClick={handleLogout}>Logout</Link>}
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/cars'>Cars</Link>
        </ul>
      </nav>
    </header>
    );
}