import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#1A1A1A] shadow-lg border-b border-[#FFC107]/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#FFC107]">
              🚖 Airport Drivers
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[#FFE082] hover:text-[#FFC107] transition-colors duration-200">
              Accueil
            </Link>
            <Link to="/admin" className="text-[#FFE082] hover:text-[#FFC107] transition-colors duration-200">
              Admin
            </Link>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center">
            <button className="text-[#FFE082] hover:text-[#FFC107] transition-colors duration-200">
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
