import { LucideUser, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
function BasicInfo({ formData, handleChange, onNext, loading }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        onNext();
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div className="flex items-center border-2 rounded-lg p-3 mb-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:shadow-lg hover:border-gray-400">
                    <LucideUser className="h-5 w-5 text-indigo-500 mr-3" />
                    <input
                        name="fullName"
                        type="text"
                        required
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center border-2 rounded-lg p-3 mb-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:shadow-lg hover:border-gray-400">
                    <Mail className="h-5 w-5 text-indigo-500 mr-3" />
                    <input
                        name="email"
                        type="email"
                        required
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center border-2 rounded-lg p-3 mb-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:shadow-lg hover:border-gray-400">
                    <Lock className="h-5 w-5 text-indigo-500 mr-3" />
                    <input
                        name="password"
                        type="password"
                        required
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center border-2 rounded-lg p-3 mb-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:shadow-lg hover:border-gray-400">
                    <Lock className="h-5 w-5 text-indigo-500 mr-3" />
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-500 hover:scale-[1.02] shadow-xl"
                >
                    {loading ? 'Processing...' : 'Next'}
                </button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-purple-600 transition-colors duration-200">
                    Sign in
                </Link>
            </div>
        </form>
    );
}

export default BasicInfo;