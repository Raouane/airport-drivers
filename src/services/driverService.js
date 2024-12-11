import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'drivers';

// Get all drivers
export const getAllDrivers = async () => {
  try {
    const driversRef = collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(driversRef);
    
    const drivers = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return drivers;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    throw new Error('Failed to fetch drivers. Please try again later.');
  }
};

// Add a new driver
export const addDriver = async (driverData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...driverData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...driverData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Error adding driver:', error);
    throw new Error('Failed to add driver. Please try again later.');
  }
};

// Update a driver
export const updateDriver = async (driverId, updateData) => {
  try {
    const driverRef = doc(db, COLLECTION_NAME, driverId);
    await updateDoc(driverRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating driver:', error);
    throw new Error('Failed to update driver. Please try again later.');
  }
};

// Delete a driver
export const deleteDriver = async (driverId) => {
  try {
    const driverRef = doc(db, COLLECTION_NAME, driverId);
    await deleteDoc(driverRef);
    return true;
  } catch (error) {
    console.error('Error deleting driver:', error);
    throw new Error('Failed to delete driver. Please try again later.');
  }
};

// Update driver visibility
export const updateDriverVisibility = async (driverId, visible) => {
  try {
    const driverRef = doc(db, COLLECTION_NAME, driverId);
    await updateDoc(driverRef, {
      visible,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating driver visibility:', error);
    throw new Error('Failed to update driver visibility. Please try again later.');
  }
};

// Update driver availability
export const updateDriverAvailability = async (driverId, available) => {
  try {
    const driverRef = doc(db, COLLECTION_NAME, driverId);
    await updateDoc(driverRef, {
      available,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating driver availability:', error);
    throw new Error('Failed to update driver availability. Please try again later.');
  }
};
