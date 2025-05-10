function ProfileSetup({ formData, handleChange, onSubmit, onSkip, loading }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <textarea
                    name="bio"
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 focus:shadow-lg hover:border-gray-400 mb-4"
                    placeholder="Tell us about yourself"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                />
                {/* <input
                    name="avatar"
                    type="text"
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 focus:shadow-lg hover:border-gray-400 mb-4"
                    placeholder="Avatar URL"
                    value={formData.avatar}
                    onChange={handleChange}
                /> */}
                <input
                    name="interestIn"
                    type="text"
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 focus:shadow-lg hover:border-gray-400"
                    placeholder="Interests (comma separated)"
                    value={formData.interestIn.join(', ')}
                    onChange={(e) => handleChange({
                        target: {
                            name: 'interestIn',
                            value: e.target.value.split(',').map(i => i.trim())
                        }
                    })}
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={onSkip}
                    className="group relative w-1/2 flex justify-center py-3 px-4 border-2 text-sm font-medium rounded-lg text-indigo-600 bg-white border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-500 hover:scale-[1.02] shadow-lg"
                >
                    Skip
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-1/2 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-500 hover:scale-[1.02] shadow-xl"
                >
                    {loading ? 'Completing profile...' : 'Complete Profile'}
                </button>
            </div>
        </form>
    );
}

export default ProfileSetup;