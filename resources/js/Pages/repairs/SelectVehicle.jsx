import { Inertia } from '@inertiajs/inertia';

const SelectVehicle = ({ vehicles }) => {
  console.log(vehicles);
  const handleSelect = (vehicleId) => {
    Inertia.get(`/repair-request/${vehicleId}`);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="m-7 rounded overflow-hidden shadow-lg">
          <img className="w-full h-48 object-cover" src={`/storage/${vehicle.photos}`} alt="Vehicle" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{vehicle.make}</div>
            <p>Model: {vehicle.model}</p>
            <p>Fuel Type: {vehicle.fuelType}</p>
            <p>Registration: {vehicle.registration}</p>
            <button 
              onClick={() => handleSelect(vehicle.id)}
              className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto w-full text-center mt-4"
            >
              Select
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectVehicle;