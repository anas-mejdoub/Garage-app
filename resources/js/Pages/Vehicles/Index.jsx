import React from 'react';

function Index(props) {
    return (
        <div className="flex flex-wrap justify-around">
            {props.vehicles.map((vehicle) => (
                <div key={vehicle.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                    <img className="w-full" src={`/storage/${vehicle.photos}`} alt="Vehicle" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{vehicle.make}</div>
                        <p>Model: {vehicle.model}</p>
                        <p>Fuel Type: {vehicle.fuelType}</p>
                        <p>Registration: {vehicle.registration}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Index;