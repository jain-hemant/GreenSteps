import { Calendar, Phone, MapPin } from 'lucide-react';

function PersonalDetails({ formData, handleChange, onNext, onBack, loading }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div className="flex items-center border-2 rounded-lg p-3 mb-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:shadow-lg hover:border-gray-400">
                    <Calendar className="h-5 w-5 text-indigo-500 mr-3" />
                    <input
                        name="dob"
                        type="date"
                        required
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center border-2 rounded-lg p-3 mb-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:shadow-lg hover:border-gray-400">
                    <Phone className="h-5 w-5 text-indigo-500 mr-3" />
                    <input
                        name="phone"
                        type="tel"
                        required
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center border-2 rounded-lg p-3 mb-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:shadow-lg hover:border-gray-400">
                    <MapPin className="h-5 w-5 text-indigo-500 mr-3" />
                    <input
                        name="address"
                        type="text"
                        required
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <input
                        name="country"
                        type="text"
                        required
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 focus:shadow-lg hover:border-gray-400 mb-4"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                    <input
                        name="state"
                        type="text"
                        required
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 focus:shadow-lg hover:border-gray-400 mb-4"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <input
                        name="city"
                        type="text"
                        required
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 focus:shadow-lg hover:border-gray-400 mb-4"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <input
                        name="zip"
                        type="text"
                        required
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 focus:shadow-lg hover:border-gray-400 mb-4"
                        placeholder="ZIP Code"
                        value={formData.zip}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="group relative w-1/2 flex justify-center py-3 px-4 border-2 text-sm font-medium rounded-lg text-indigo-600 bg-white border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-500 hover:scale-[1.02] shadow-lg"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-1/2 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-500 hover:scale-[1.02] shadow-xl"
                >
                    {loading ? 'Processing...' : 'Next'}
                </button>
            </div>
        </form>
    );
}

export default PersonalDetails;