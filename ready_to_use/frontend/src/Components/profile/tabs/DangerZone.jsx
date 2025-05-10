import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

function DangerZone({ onDeleteAccount }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmText, setConfirmText] = useState('');

    const handleDeleteRequest = () => {
        if (confirmText.toLowerCase() === 'delete my account') {
            onDeleteAccount();
            setShowConfirmation(false);
            setConfirmText('');
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <h3 className="text-lg font-medium text-red-900">Danger Zone</h3>
                </div>

                <div className="mt-4 text-sm text-red-700">
                    <p>Once you delete your account, there is no going back. Please be certain.</p>
                </div>

                {!showConfirmation ? (
                    <button
                        type="button"
                        onClick={() => setShowConfirmation(true)}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete Account
                    </button>
                ) : (
                    <div className="mt-4 space-y-4">
                        <p className="text-sm text-red-600">
                            Please type <span className="font-semibold">delete my account</span> to confirm.
                        </p>
                        <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            placeholder="Type 'delete my account' to confirm"
                            className="block w-full rounded-md border-red-300 focus:border-red-500 focus:ring-red-500"
                        />
                        <div className="flex space-x-3">
                            <button
                                type="button"
                                onClick={handleDeleteRequest}
                                disabled={confirmText.toLowerCase() !== 'delete my account'}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed"
                            >
                                Confirm Delete
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowConfirmation(false);
                                    setConfirmText('');
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DangerZone;