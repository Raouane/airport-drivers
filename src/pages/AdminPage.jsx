import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrivers } from '../context/DriversContext';

const AdminPage = () => {
  const navigate = useNavigate();
  const { drivers, loading, error, updateDriverVisibility, addDriver } = useDrivers();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    whatsapp: '',
    carBrand: '',
    carModel: '',
    licensePlate: '',
    available: true,
    visible: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    
    try {
      setSubmitting(true);
      console.log('Form submitted with data:', formData);
      console.log('Attempting to add driver...');
      
      const newDriver = {
        name: formData.name,
        photo: formData.photo,
        whatsapp: formData.whatsapp,
        car: {
          brand: formData.carBrand,
          model: formData.carModel,
          licensePlate: formData.licensePlate
        },
        available: formData.available,
        visible: formData.visible
      };

      console.log('Prepared driver data:', newDriver);
      const result = await addDriver(newDriver);
      console.log('Driver added successfully:', result);

      // Reset form
      setFormData({
        name: '',
        photo: '',
        whatsapp: '',
        carBrand: '',
        carModel: '',
        licensePlate: '',
        available: true,
        visible: true
      });

      // Close form
      setShowForm(false);
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log('Form field changed:', { name, value, type, checked });
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVisibilityToggle = async (driverId) => {
    try {
      console.log('Toggling visibility for driver:', driverId);
      await updateDriverVisibility(driverId);
      console.log('Visibility toggled successfully');
    } catch (err) {
      console.error('Error toggling visibility:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] py-12 px-4 flex items-center justify-center">
        <div className="text-[#FFC107] text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#FFC107]">Gestion des Chauffeurs</h1>
          <button
            onClick={() => {
              console.log('Toggle form button clicked');
              setShowForm(!showForm);
            }}
            className="bg-[#FFC107] text-black px-4 py-2 rounded hover:bg-[#FFD700] transition-colors"
          >
            {showForm ? 'Fermer' : 'Ajouter un Chauffeur'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[#2D2D2D] p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#FFC107] mb-2">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] text-white p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-[#FFC107] mb-2">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] text-white p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-[#FFC107] mb-2">WhatsApp</label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] text-white p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-[#FFC107] mb-2">Marque de voiture</label>
                <input
                  type="text"
                  name="carBrand"
                  value={formData.carBrand}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] text-white p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-[#FFC107] mb-2">Modèle de voiture</label>
                <input
                  type="text"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] text-white p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-[#FFC107] mb-2">Plaque d'immatriculation</label>
                <input
                  type="text"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] text-white p-2 rounded"
                  required
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-[#FFC107]">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Disponible
                </label>
                <label className="text-[#FFC107]">
                  <input
                    type="checkbox"
                    name="visible"
                    checked={formData.visible}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Visible
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`mt-6 bg-[#FFC107] text-black px-6 py-2 rounded hover:bg-[#FFD700] transition-colors ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Ajout en cours...' : 'Ajouter'}
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map(driver => (
            <div key={driver.id} className="bg-[#2D2D2D] p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-[#FFC107]">{driver.name}</h2>
                <button
                  onClick={() => handleVisibilityToggle(driver.id)}
                  className={`px-3 py-1 rounded ${
                    driver.visible
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-red-500 hover:bg-red-600'
                  } text-white transition-colors`}
                >
                  {driver.visible ? 'Visible' : 'Caché'}
                </button>
              </div>
              {driver.photo && (
                <img
                  src={driver.photo}
                  alt={driver.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <div className="space-y-2 text-white">
                <p>WhatsApp: {driver.whatsapp}</p>
                <p>Voiture: {driver.car.brand} {driver.car.model}</p>
                <p>Plaque: {driver.car.licensePlate}</p>
                <p>Status: {driver.available ? 'Disponible' : 'Non disponible'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
