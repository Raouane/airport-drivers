import { useParams, useNavigate } from 'react-router-dom';
import { useDrivers } from '../context/DriversContext';

const DriverProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { drivers, updateDriverAvailability } = useDrivers();
  
  const driver = drivers.find(d => d.id === parseInt(id));

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

  const handleAvailabilityToggle = () => {
    updateDriverAvailability(driver.id, !driver.available);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-[#2A2A2A] rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl text-[#FFC107]">Profil Chauffeur</h1>
          <button
            onClick={() => navigate('/')}
            className="text-[#FFE082] hover:text-[#FFC107] transition-colors duration-200"
          >
            ← Retour à l'accueil
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={driver.photo}
              alt={driver.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-xl text-[#FFE082] mb-4">{driver.name}</h2>
            
            {/* Statut de disponibilité */}
            <div className="mb-4">
              <button
                onClick={handleAvailabilityToggle}
                className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
                  driver.available
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {driver.available ? '✓ Disponible' : '✗ Indisponible'}
              </button>
            </div>

            {/* Informations de contact */}
            <div className="space-y-2 mb-4">
              <p className="flex items-center">
                <span className="text-[#FFC107] mr-2">📱 WhatsApp:</span>
                <a
                  href={`https://wa.me/${driver.whatsapp}`}
                  className="text-[#FFE082] hover:text-[#FFC107] transition-colors duration-200"
                >
                  {driver.whatsapp}
                </a>
              </p>
            </div>

            {/* Informations du véhicule */}
            <div className="space-y-2">
              <h3 className="text-[#FFC107] mb-2">Informations du véhicule</h3>
              <p>
                <span className="text-[#FFE082]">🚗 Véhicule:</span>{' '}
                {driver.car.brand} {driver.car.model}
              </p>
              <p>
                <span className="text-[#FFE082]">🔢 Immatriculation:</span>{' '}
                {driver.car.licensePlate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfilePage;
