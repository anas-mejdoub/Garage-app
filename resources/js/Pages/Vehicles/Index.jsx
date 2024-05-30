import React from 'react';
import bgImage from '../repairs/select.jpg'; 

function Index(props) {
    return (
        <div className="grid grid-cols-3 gap-4" style={{ backgroundImage: `url(${bgImage})` }}>
      {props.vehicles.map((vehicle) => (
        <div key={vehicle.id} className="m-4 bg-gradient-to-b from-slate-950 to-slate-800 opacity-11 p-6 rounded-lg">
          <img className="w-full h-48 object-cover" src={`/storage/${vehicle.photos}`} alt="Vehicle" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl text-white mb-2">{vehicle.make}</div>
            <p className="font-bold text-xl text-white mb-2">Model: {vehicle.model}</p>
            <p className="font-bold text-xl text-white mb-2">Fuel Type: {vehicle.fuelType}</p>
            <p className="font-bold text-xl text-white mb-2">Registration: {vehicle.registration}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Index;