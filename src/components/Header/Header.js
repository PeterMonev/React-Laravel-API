import '../Header/Header.css';

import { Link } from 'react-router-dom';


export const Header = () => {
    return(
    <header className="header">
      <nav className="nav">
        <ul className="nav__ul">
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          <Link to='/logout'>Logout</Link>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/cars'>Cars</Link>
        </ul>
      </nav>
    </header>
    );
}