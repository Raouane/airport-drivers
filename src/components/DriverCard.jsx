import { useNavigate } from 'react-router-dom';

const DriverCard = ({ driver }) => {
  const navigate = useNavigate();

  return (
    <div className="driver-card bg-[#2A2A2A] p-6 rounded-lg shadow-xl">
      <div className="h-48 mb-4">
        <img
          src={driver.photo}
          alt={driver.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      <h2 className="text-xl font-semibold text-[#FFE082] mb-3">{driver.name}</h2>
      
      <div className="space-y-2 mb-4">
        <p className="flex items-center text-sm">
          <span className="text-[#FFC107] mr-2">📱</span>
          <a 
            href={`https://wa.me/${driver.whatsapp}`} 
            className="text-[#FFE082] hover:text-[#FFC107] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {driver.whatsapp}
          </a>
        </p>
        <p className="flex items-center text-sm">
          <span className="text-[#FFC107] mr-2">🚗</span>
          <span className="text-[#FFE082]">
            {driver.car.brand} {driver.car.model}
          </span>
        </p>
        <p className="flex items-center text-sm">
          <span className="text-[#FFC107] mr-2">🔢</span>
          <span className="text-[#FFE082]">
            {driver.car.licensePlate}
          </span>
        </p>
      </div>

      <div className="mt-4">
        <button
          onClick={() => navigate(`/booking/${driver.id}`)}
          className="w-full bg-[#FFC107] text-[#1A1A1A] px-6 py-2 rounded-full hover:bg-[#FFE082] transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!driver.available}
        >
          {driver.available ? '🚖 Réserver' : 'Chauffeur indisponible'}
        </button>
      </div>
    </div>
  );
};

export default DriverCard;
