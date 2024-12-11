import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDrivers } from '../context/DriversContext';

const PICKUP_LOCATIONS = [
  { id: 'djerba', name: 'Djerba' },
  { id: 'tunis', name: 'Tunis' }
];

const DESTINATIONS = [
  { id: 'tataouine', name: 'Tataouine' },
  { id: 'gabes', name: 'Gabès' },
  { id: 'medenine', name: 'Médenine' },
  { id: 'zarzis', name: 'Zarzis' },
  { id: 'remada', name: 'Remada' },
  { id: 'sfax', name: 'Sfax' }
];

// Générer les tranches horaires de 30 minutes
const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minutes = (i % 2) * 30;
  return {
    value: `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
    label: `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  };
});

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { drivers } = useDrivers();
  const driver = drivers.find(d => d.id === parseInt(id));
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    pickup: '',
    destination: '',
    date: '',
    time: '',
    phone: '',
    email: '',
    paymentMethod: 'cash',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const bookingDetails = {
      ...formData,
      driverId: id,
      driverName: driver.name,
      pickup: PICKUP_LOCATIONS.find(loc => loc.id === formData.pickup)?.name,
      destination: DESTINATIONS.find(dest => dest.id === formData.destination)?.name
    };

    if (formData.paymentMethod === 'cash') {
      navigate('/thank-you', { state: { bookingDetails } });
    } else {
      setShowPopup(true);
    }
  };

  if (!driver) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl text-[#FFC107] mb-4">Chauffeur non trouvé</h1>
        <button
          onClick={() => navigate('/')}
          className="text-[#FFE082] hover:text-[#FFC107] transition-colors duration-200"
        >
          ← Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#FFC107] mb-4">
                🚧 Fonctionnalité en développement
              </h3>
              <p className="text-[#FFE082] mb-6">
                Le paiement en ligne sera bientôt disponible. Merci de votre patience !
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-[#FFC107] text-[#1A1A1A] py-2 px-6 rounded-full hover:bg-[#FFE082] transition-colors duration-200 font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#FFC107]">
            Réserver avec {driver.name}
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-[#FFE082] hover:text-[#FFC107] transition-colors duration-200"
          >
            ← Retour à l'accueil
          </button>
        </div>

        {/* Informations du chauffeur */}
        <div className="bg-[#2A2A2A] p-4 rounded-lg mb-8 flex items-center gap-4">
          <img
            src={driver.photo}
            alt={driver.name}
            className="w-16 h-16 object-cover rounded-full"
          />
          <div>
            <h2 className="text-[#FFE082] font-semibold">{driver.name}</h2>
            <p className="text-sm text-[#FFE082]/80">
              {driver.car.brand} {driver.car.model} • {driver.car.licensePlate}
            </p>
          </div>
        </div>

        {/* Formulaire de réservation */}
        <form onSubmit={handleSubmit} className="bg-[#2A2A2A] p-6 rounded-lg shadow-xl space-y-6">
          {/* Prénom du client */}
          <div>
            <label htmlFor="firstName" className="block text-[#FFC107] mb-2">
              Prénom *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] text-[#FFE082] p-3 rounded border border-[#FFC107]/20 focus:border-[#FFC107] focus:outline-none"
              required
              placeholder="Votre prénom"
            />
          </div>

          {/* Lieu de prise en charge */}
          <div>
            <label htmlFor="pickup" className="block text-[#FFC107] mb-2">
              Lieu de prise en charge *
            </label>
            <select
              id="pickup"
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] text-[#FFE082] p-3 rounded border border-[#FFC107]/20 focus:border-[#FFC107] focus:outline-none cursor-pointer"
              required
            >
              <option value="">Sélectionnez un lieu de départ</option>
              {PICKUP_LOCATIONS.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div>
            <label htmlFor="destination" className="block text-[#FFC107] mb-2">
              Destination *
            </label>
            <select
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] text-[#FFE082] p-3 rounded border border-[#FFC107]/20 focus:border-[#FFC107] focus:outline-none cursor-pointer"
              required
            >
              <option value="">Sélectionnez une destination</option>
              {DESTINATIONS.map(destination => (
                <option key={destination.id} value={destination.id}>
                  {destination.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date et Heure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="date" 
                className="block text-[#FFC107] mb-2 cursor-pointer"
                onClick={() => document.getElementById('date').showPicker()}
              >
                Date *
              </label>
              <div 
                className="relative cursor-pointer"
                onClick={() => document.getElementById('date').showPicker()}
              >
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] text-[#FFE082] p-3 rounded border border-[#FFC107]/20 focus:border-[#FFC107] focus:outline-none cursor-pointer"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
                <div className="absolute inset-0" />
              </div>
            </div>
            <div>
              <label 
                htmlFor="time" 
                className="block text-[#FFC107] mb-2"
              >
                Heure *
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] text-[#FFE082] p-3 rounded border border-[#FFC107]/20 focus:border-[#FFC107] focus:outline-none cursor-pointer"
                required
              >
                <option value="">Sélectionnez une heure</option>
                {TIME_SLOTS.map(slot => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-[#FFC107] mb-2">
                Téléphone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] text-[#FFE082] p-3 rounded border border-[#FFC107]/20 focus:border-[#FFC107] focus:outline-none"
                required
                placeholder="XX XXX XXX"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[#FFC107] mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] text-[#FFE082] p-3 rounded border border-[#FFC107]/20 focus:border-[#FFC107] focus:outline-none"
                required
                placeholder="votre@email.com"
              />
            </div>
          </div>

          {/* Méthode de paiement */}
          <div>
            <label className="block text-[#FFC107] mb-2">
              Méthode de paiement *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-[#FFE082]">Espèces</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={formData.paymentMethod === 'online'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-[#FFE082]">Paiement en ligne</span>
              </label>
            </div>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-[#FFC107] text-[#1A1A1A] py-3 px-6 rounded-full hover:bg-[#FFE082] transition-colors duration-200 font-semibold mt-8"
          >
            Confirmer la réservation
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
