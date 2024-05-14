import React from 'react';
import { FaCar, FaCheckCircle } from 'react-icons/fa';
import { Card } from "flowbite-react";

export function Component(props) {
    return (
      <Card
        className="max-w-sm rounded overflow-hidden shadow-lg m-4"
        imgSrc={`/storage/${props.img}`}
      >
        <div className="px-6 py-4">
          <div className="flex items-center">
            <FaCar className="mr-2"/>
            <h5 className="font-bold text-xl mb-2 text-gray-700 dark:text-white">
              {props.carName}
            </h5>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="mr-2"/>
            <p className="text-gray-700 dark:text-gray-400 text-base">
              {props.status}
            </p>
          </div>
        </div>
      </Card>
    );
}

const CompletedRepairs = ({ repairs }) => {
    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 flex-wrap">
            {repairs.length > 0 ? (
                repairs.map((repair, index) => (
                    <Component key={index} img={repair.vehicle_photos} carName={repair.description} status={repair.status}/>
                ))
            ) : (
                <p className="text-red-500">No completed repairs.</p>
            )}
        </div>
    );
};

export default CompletedRepairs;