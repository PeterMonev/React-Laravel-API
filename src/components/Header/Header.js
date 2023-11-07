import '../Header/Header.css';
import { useAuth } from '../../hooks/authContext';

import { Link } from 'react-router-dom';

export const Header = () => {
  const { user , logout} = useAuth();
 
  const handleLogout = () => {
    logout();
  }

    return(
    <header className="header">
      <nav className="nav">
        <ul className="nav__ul">
          {!user && <Link to='/login'>Login</Link>}
          {!user && <Link to='/register'>Register</Link>}
          {user && <Link to='/dashboard'>Dashboard</Link>}
          <Link to='/cars'>Cars</Link>
          {user && <Link to='/login' onClick={handleLogout}>Logout</Link>}
        </ul>
      </nav>
    </header>
    );
}