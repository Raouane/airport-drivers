import { useDrivers } from '../context/DriversContext';
import DriverCard from '../components/DriverCard';

const HomePage = () => {
  const { drivers } = useDrivers();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#FFC107] mb-8 text-center">
        Nos Chauffeurs
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map(driver => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
