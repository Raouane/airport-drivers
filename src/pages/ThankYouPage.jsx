import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const bookingDetails = state?.bookingDetails;

  useEffect(() => {
    if (!bookingDetails) {
      navigate('/');
    }
  }, [bookingDetails, navigate]);

  if (!bookingDetails) return null;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-[#2A2A2A] p-8 rounded-lg shadow-xl text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-[#FFC107] mb-6">
          Merci pour votre réservation !
        </h1>
        
        <div className="mb-8 text-[#FFE082]">
          <p className="mb-4">
            Votre chauffeur vous attendra à l'adresse indiquée.
          </p>
          <div className="bg-[#1A1A1A] p-6 rounded-lg mb-6">
            <h2 className="text-[#FFC107] font-semibold mb-4">Récapitulatif de votre réservation</h2>
            <div className="space-y-2 text-left">
              <p><span className="text-[#FFC107]">📍 Départ :</span> {bookingDetails.pickup}</p>
              <p><span className="text-[#FFC107]">🎯 Destination :</span> {bookingDetails.destination}</p>
              <p><span className="text-[#FFC107]">📅 Date :</span> {bookingDetails.date}</p>
              <p><span className="text-[#FFC107]">⏰ Heure :</span> {bookingDetails.time}</p>
              <p><span className="text-[#FFC107]">💰 Paiement :</span> En espèces</p>
            </div>
          </div>
          <p className="text-sm">
            Un email de confirmation a été envoyé à {bookingDetails.email}
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="bg-[#FFC107] text-[#1A1A1A] px-8 py-3 rounded-full hover:bg-[#FFE082] transition-colors duration-200 font-semibold"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
