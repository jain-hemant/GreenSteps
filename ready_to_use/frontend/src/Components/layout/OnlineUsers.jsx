import { useState } from 'react';

const OnlineUsers = () => {
    // Sample data - in a real app, this would come from an API or Redux store
    const [users] = useState([
        { id: '1094882001', name: 'Maren Maureen', avatar: 'https://ui-avatars.com/api/?name=Maren+Maureen&background=random', online: true },
        { id: '1094672000', name: 'Jennifer Jane', avatar: 'https://ui-avatars.com/api/?name=Jennifer+Jane&background=random', online: true },
        { id: '1094342003', name: 'Ryan Herwinds', avatar: 'https://ui-avatars.com/api/?name=Ryan+Herwinds&background=random', online: true },
        { id: '1094682002', name: 'Kierra Culhane', avatar: 'https://ui-avatars.com/api/?name=Kierra+Culhane&background=random', online: true },
    ]);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Online Users</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                    See all
                </button>
            </div>

            <div className="space-y-3">
                {users.map(user => (
                    <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="relative">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                {user.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.id}</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OnlineUsers;