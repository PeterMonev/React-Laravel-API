import '../Footer/Footer.css'


export const Footer = () => {
    return (
      <footer className="footer">
        <div className="div__footer">
          <p>&copy; {new Date().getFullYear()} Peter Monev. All rights reserved.</p>
        </div>
      </footer>
    );
  };
