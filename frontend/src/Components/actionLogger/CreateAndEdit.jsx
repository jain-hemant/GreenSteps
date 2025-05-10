import { useState } from 'react';
import { FaLeaf, FaSave } from 'react-icons/fa';

export default function ActionLogger({ onSubmit, defaultValues, habits }) {
  const [formData, setFormData] = useState(
    defaultValues || {
      habitId: '',
      quantity: 1,
      date: new Date().toISOString().split('T')[0],
    },
  );

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold text-green-700 flex items-center space-x-2">
        <FaLeaf className="text-green-500" /> Log Your Action
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
        className="space-y-4 mt-3"
      >
        <label className="block text-green-700 font-semibold">Habit</label>
        <select
          name="habitId"
          value={formData.habitId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">{'Select'}</option>
          {/* Add dynamic habit options here */}
          {habits?.map((habit) => {
            return (
              <option value={habit._id} key={habit._id}>
                {habit.name}
              </option>
            );
          })}
        </select>

        <label className="block text-green-700 font-semibold">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          className="w-full p-2 border rounded"
        />

        <label className="block text-green-700 font-semibold">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
        >
          <FaSave className="mr-2" /> Save Action
        </button>
      </form>
    </div>
  );
}
