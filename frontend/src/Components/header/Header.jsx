import { logoutUser } from '##/src/utility/auth';
import { FaBell } from 'react-icons/fa';

export default function Header({ user = {} }) {
  return (
    <header className="w-full sticky z-10 top-0 flex justify-between items-center bg-white shadow-md p-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-green-800">GreenSteps</h1>
        <div className="flex items-center space-x-1 bg-green-100 px-3 py-1 rounded-full shadow-sm">
          <span className="font-semibold text-green-700">{user.ecoPoints}</span>
          <span className="text-green-600 text-sm">eco-pts</span>
        </div>
      </div>
      <div className="flex items-center space-x-4" onClick={() => logoutUser()}>
        <FaBell className="h-6 w-6 text-gray-500 cursor-pointer hover:text-green-600 transition-transform hover:scale-110" />
        <img
          src={user.avatarUrl}
          alt="User avatar"
          className="h-8 w-8 rounded-full border border-green-300 shadow-sm"
        />
      </div>
    </header>
  );
}
