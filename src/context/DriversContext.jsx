import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAllDrivers,
  addDriver as addDriverToDb,
  updateDriver as updateDriverInDb,
  deleteDriver as deleteDriverFromDb,
  updateDriverVisibility as updateDriverVisibilityInDb,
  updateDriverAvailability as updateDriverAvailabilityInDb
} from '../services/driverService';

const DriversContext = createContext();

export const useDrivers = () => {
  const context = useContext(DriversContext);
  if (!context) {
    throw new Error('useDrivers must be used within a DriversProvider');
  }
  return context;
};

export const DriversProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load drivers when component mounts
  useEffect(() => {
    console.log('DriversProvider mounted, loading drivers...');
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading drivers from Firestore...');
      const driversData = await getAllDrivers();
      console.log('Drivers loaded successfully:', driversData);
      setDrivers(driversData);
    } catch (err) {
      console.error('Error loading drivers:', err);
      setError('Error loading drivers: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addDriver = async (driverData) => {
    try {
      setError(null);
      console.log('Adding new driver:', driverData);
      const newDriver = await addDriverToDb(driverData);
      
      setDrivers(prev => [...prev, newDriver]);
      console.log('Driver added successfully:', newDriver);
      return newDriver;
    } catch (err) {
      console.error('Error adding driver:', err);
      setError('Error adding driver: ' + err.message);
      throw err;
    }
  };

  const updateDriver = async (driverId, updateData) => {
    try {
      setError(null);
      await updateDriverInDb(driverId, updateData);
      
      setDrivers(prev => 
        prev.map(driver => 
          driver.id === driverId 
            ? { ...driver, ...updateData }
            : driver
        )
      );
    } catch (err) {
      console.error('Error updating driver:', err);
      setError('Error updating driver: ' + err.message);
      throw err;
    }
  };

  const deleteDriver = async (driverId) => {
    try {
      setError(null);
      await deleteDriverFromDb(driverId);
      
      setDrivers(prev => prev.filter(driver => driver.id !== driverId));
    } catch (err) {
      console.error('Error deleting driver:', err);
      setError('Error deleting driver: ' + err.message);
      throw err;
    }
  };

  const updateDriverVisibility = async (driverId, visible) => {
    try {
      setError(null);
      console.log('Updating driver visibility:', { driverId, visible });
      await updateDriverVisibilityInDb(driverId, visible);
      
      setDrivers(prev => 
        prev.map(driver => 
          driver.id === driverId 
            ? { ...driver, visible }
            : driver
        )
      );
    } catch (err) {
      console.error('Error updating driver visibility:', err);
      setError('Error updating driver visibility: ' + err.message);
      throw err;
    }
  };

  const updateDriverAvailability = async (driverId, available) => {
    try {
      setError(null);
      console.log('Updating driver availability:', { driverId, available });
      await updateDriverAvailabilityInDb(driverId, available);
      
      setDrivers(prev => 
        prev.map(driver => 
          driver.id === driverId 
            ? { ...driver, available }
            : driver
        )
      );
    } catch (err) {
      console.error('Error updating driver availability:', err);
      setError('Error updating driver availability: ' + err.message);
      throw err;
    }
  };

  const value = {
    drivers,
    loading,
    error,
    addDriver,
    updateDriver,
    deleteDriver,
    updateDriverVisibility,
    updateDriverAvailability,
    refreshDrivers: loadDrivers
  };

  return (
    <DriversContext.Provider value={value}>
      {children}
    </DriversContext.Provider>
  );
};
