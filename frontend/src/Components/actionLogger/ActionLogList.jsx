import { FaTrash, FaCheckCircle } from 'react-icons/fa';

export default function ActionLogList({ logs, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-green-700">Recent Actions</h2>
      <ul className="divide-y mt-3">
        {logs.map((log) => (
          <li key={log._id} className="flex justify-between items-center py-2">
            <span className="text-green-600 flex items-center space-x-2">
              <FaCheckCircle className="text-green-500" /> {log.habit?.name} -{' '}
              {log.quantity} units
            </span>
            <button
              onClick={() => onDelete(log._id)}
              className="text-red-600 hover:text-red-800 flex items-center"
            >
              <FaTrash className="mr-1" /> Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
