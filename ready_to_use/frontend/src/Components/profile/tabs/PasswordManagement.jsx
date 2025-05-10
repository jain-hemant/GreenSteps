import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function PasswordManagement({ onUpdate }) {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        onUpdate(name, value);
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const renderPasswordField = (name, label, value, showField) => (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    type={showField ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    className="block w-full pr-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                    type="button"
                    onClick={() => togglePasswordVisibility(name)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                    {showField ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderPasswordField(
                    'currentPassword',
                    'Current Password',
                    formData.currentPassword,
                    showPasswords.current
                )}
                {renderPasswordField(
                    'newPassword',
                    'New Password',
                    formData.newPassword,
                    showPasswords.new
                )}
                <div className="md:col-span-2">
                    {renderPasswordField(
                        'confirmPassword',
                        'Confirm New Password',
                        formData.confirmPassword,
                        showPasswords.confirm
                    )}
                </div>
            </div>
        </div>
    );
}

export default PasswordManagement;