import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">WorkConnect ALBANIA</Link>
        <div className="flex items-center gap-6">
          <NavLink to="/" className="hover:text-primary">Home</NavLink>
          <NavLink to="/services" className="hover:text-primary">Services</NavLink>
          <NavLink to="/about" className="hover:text-primary">About Us</NavLink>
          <NavLink to="/contact" className="hover:text-primary">Contact</NavLink>
          {!user ? (
            <>
              <NavLink to="/login" className="hover:text-primary">Login</NavLink>
              <NavLink to="/register" className="hover:text-primary">Register</NavLink>
            </>
          ) : (
            <button onClick={logout} className="bg-primary text-white px-3 py-1 rounded">Logout</button>
          )}
        </div>
      </nav>
    </header>
  );
}
