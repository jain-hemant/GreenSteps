import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMe } from '../../../store/slices/userSlice.js';

function AddressInfo({ onUpdate, isEditing, address }) {
    const currentUser = useSelector(selectMe);
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        country: '',
        zip: ''
    });

    useEffect(() => {
        if (address) {
            setFormData(prev => ({
                ...prev,
                street: address.street || '',
                city: address.city || '',
                state: address.state || '',
                country: address.country || '',
                zip: address.zip || ''
            }));
        }
    }, [address]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        onUpdate(name, value);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 px-4 py-2"
                    />
                </div> */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 px-4 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">State/Province</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 px-4 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 px-4 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 px-4 py-2"
                    />
                </div>
            </div>
        </div>
    );
}

export default AddressInfo;