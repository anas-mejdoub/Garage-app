import React, { useState } from 'react';

const RepairDetails = ({ repair, parts }) => {
    const [currentRepair, setCurrentRepair] = useState(repair);
    const [currentParts, setCurrentParts] = useState(parts);

    const addPartToRepair = (part) => {
        // Add code here to add the part to the repair
    };

    return (
        <div>
            <h1>Repair Details</h1>
            <p>{currentRepair.description}</p>

            <h2>Spare Parts</h2>
            <ul>
                {currentParts.map((part) => (
                    <li key={part.id}>
                        {part.partName} - {part.price}
                        <button onClick={() => addPartToRepair(part)}>Add to repair</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepairDetails;
