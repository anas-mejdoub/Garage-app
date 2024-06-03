import React, { useState } from 'react';
import Modal from 'react-modal';
import { Form } from 'react-router-dom';
import { Inertia } from '@inertiajs/inertia';
export default function SpareParts({ spare }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [selectedPart, setSelectedPart] = useState(null);
    const [formData, setFormData] = useState({
        partName: '',
        partReference: '',
        price: '',
        quantity: '',
        supplier: ''
    });

    const openUpdateModal = (part) => {
        // console.log("test",part);
        setSelectedPart(part);
        setFormData({
            id : part.id,
            partName: part.partName,
            partReference: part.partReference,
            price: part.price,
            quantity: part.quantity,
            supplier: part.supplier
        });
        setModalIsOpen(true);
    };

    const closeUpdateModal = () => {
        setModalIsOpen(false);
    };

    const openDeleteModal = (part) => {
        setSelectedPart(part);
        setDeleteModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
    };

    const handleUpdate = () => {
        Inertia.post('/admin/update-spare-parts', {"formData" : formData});
        closeUpdateModal();
    };

    const handleDelete = () => {
        // Handle the delete logic here
        closeDeleteModal();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-6 bg-gray-800 flex flex-col gap-4 items-center" style={{ background: '#161D32', minHeight: '100vh' }}>
            <h1 className="text-3xl font-bold text-white mb-4">Spare Parts</h1>
            <div className="w-full max-w-4xl bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                <table className="table-auto w-full border-collapse bg-gray-900 text-gray-400 rounded-lg">
                    <thead>
                        <tr className="hover:bg-gray-700 transition-colors duration-300">
                            <th className="px-4 py-2 border-gray-300 text-center">Part Name</th>
                            <th className="px-4 py-2 border-gray-300 text-center">Reference</th>
                            <th className="px-4 py-2 border-gray-300 text-center">Price</th>
                            <th className="px-4 py-2 border-gray-300 text-center">Quantity</th>
                            <th className="px-4 py-2 border-gray-300 text-center">Supplier</th>
                            <th className="px-4 py-2 border-gray-300 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spare.map((part) => (
                            <tr key={part.id} className="hover:bg-gray-700 transition-colors duration-300">
                                <td className="border-gray-300 px-4 py-2 text-center">{part.partName}</td>
                                <td className="border-gray-300 px-4 py-2 text-center">{part.partReference}</td>
                                <td className="border-gray-300 px-4 py-2 text-center">{part.price}</td>
                                <td className="border-gray-300 px-4 py-2 text-center">{part.quantity}</td>
                                <td className="border-gray-300 px-4 py-2 text-center">{part.supplier}</td>
                                <td className="border-gray-300 px-4 py-2 text-center">
                                    <button onClick={() => openUpdateModal(part)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
                                    <button onClick={() => openDeleteModal(part)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeUpdateModal}
                contentLabel="Update Part Modal"
                className="m-auto w-500 h-90 border border-gray-300 shadow-lg p-6 rounded-md bg-gray-800"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
            >
                <h2 className="text-2xl font-bold mb-4 text-white">Update Spare Part</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="partName">Part Name</label>
                        <input
                            type="text"
                            name="partName"
                            value={formData.partName}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="partReference">Part Reference</label>
                        <input
                            type="text"
                            name="partReference"
                            value={formData.partReference}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="price">Price</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="supplier">Supplier</label>
                        <input
                            type="text"
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={closeUpdateModal}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={deleteModalIsOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Delete Confirmation Modal"
                className="m-auto w-500 h-90 border border-gray-300 shadow-lg p-6 rounded-md bg-gray-800"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
            >
                <h2 className="text-2xl font-bold mb-4 text-white">Confirm Delete</h2>
                <p className="text-white mb-4">Are you sure you want to delete this spare part?</p>
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={closeDeleteModal}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
}
