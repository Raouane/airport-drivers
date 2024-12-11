import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2A2A2A] text-[#FFE082]/80 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-[#FFC107] font-semibold mb-4">À propos</h3>
            <p className="text-sm">
              Service de transport professionnel pour vos trajets vers l'aéroport.
              Confort, ponctualité et sécurité garantis.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-[#FFC107] font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-[#FFC107] transition-colors duration-200">
                  Nos services
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#FFC107] transition-colors duration-200">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#FFC107] transition-colors duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#FFC107] font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 +33 1 23 45 67 89</li>
              <li>✉️ contact@airport-drivers.com</li>
              <li>📍 Paris, France</li>
            </ul>
          </div>

          {/* Espace Pro */}
          <div>
            <h3 className="text-[#FFC107] font-semibold mb-4">Espace Pro</h3>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => navigate('/admin')}
                className="text-[#FFE082]/60 hover:text-[#FFC107] transition-colors duration-200"
              >
                Administration →
              </button>
              <br />
              <button
                onClick={() => navigate('/driver/login')}
                className="text-[#FFE082]/60 hover:text-[#FFC107] transition-colors duration-200"
              >
                Espace chauffeur →
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-[#FFE082]/20 text-center text-sm text-[#FFE082]/60">
          &copy; {currentYear} Airport Drivers. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
