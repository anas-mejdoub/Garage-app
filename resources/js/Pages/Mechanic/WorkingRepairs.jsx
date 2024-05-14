import React, { useState } from 'react';
import Modal from 'react-modal';
import {Card} from "flowbite-react";
import {FaCar, FaCheckCircle} from "react-icons/fa";


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
const RepairDetails = ({ repair, parts }) => {
    console.log(repair)
    const [currentRepair, setCurrentRepair] = useState(repair);
    const [currentParts, setCurrentParts] = useState(parts);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const addPartToRepair = (part) => {
        // Add code here to add the part to the repair
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Repair Details</h1>
          <div className="mb-4 bg-white shadow-lg flex flex-col justify-center items-center rounded-lg overflow-hidden">
    <h2 className="text-2xl font-bold mb-2 p-4">Repair Information</h2>
    <div className="px-4 py-5 w-1/3 bg-grey-100 flex  flex-col justify-center items-center">
        <Component img={currentRepair.vehicle_photos} carName={repair.description} status={repair.status}/>
        <button onClick={openModal} className="bg-green-500 w-5/2 text-white px-4 py-2 rounded">Add a spare part</button>
    </div>
    {/*<div className="px-4 py-5 bg-gray-100">*/}
    {/*</div>*/}
</div>

            {/*<h2 className="text-2xl font-bold mb-4">Spare Parts</h2>*/}
            {/*<ul className="space-y-2">*/}
            {/*    {currentParts.map((part) => (*/}
            {/*        <li key={part.id} className="flex justify-between items-center border p-2 rounded">*/}
            {/*            <span>{part.partName} - {part.price}</span>*/}
            {/*            <button onClick={() => addPartToRepair(part)} className="bg-blue-500 text-white px-4 py-2 rounded">Add to repair</button>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Spare Part Modal"
                className="m-auto w-11/12 md:w-1/2 lg:w-1/3 border border-gray-300 shadow-lg p-6 rounded-md bg-white"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
            >
                <h2 className="text-2xl font-bold mb-4">Add Spare Part</h2>
                <ul className="space-y-2">
                    {currentParts.map((part) => (
                        <li key={part.id} className="flex justify-between items-center border p-2 rounded">
                            <span>{part.partName} - {part.price}</span>
                            <button onClick={() => addPartToRepair(part)} className="bg-blue-500 text-white px-4 py-2 rounded">Add to repair</button>
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
};

export default RepairDetails;
