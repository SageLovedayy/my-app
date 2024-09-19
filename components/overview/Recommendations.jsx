import React from "react";

const Recommendations = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700">
          Suggested Workouts
        </h3>
        <ul className="mt-4 space-y-3">
          <li className="text-gray-600">🏋️‍♂️ Strength Training</li>
          <li className="text-gray-600">🤸‍♂️ Yoga for Flexibility</li>
          <li className="text-gray-600">🚴‍♀️ Cycling</li>
        </ul>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700">Nutrition Tips</h3>
        <ul className="mt-4 space-y-3">
          <li className="text-gray-600">🍎 Eat more protein</li>
          <li className="text-gray-600">🥗 Incorporate healthy fats</li>
          <li className="text-gray-600">💧 Stay hydrated</li>
        </ul>
      </div>
      <div className="flex justify-between space-x-4 mt-8">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg">
          Start Workout
        </button>
        <button className="text-yellow-500 hover:text-yellow-600 underline">
          View Progress Details
        </button>
      </div>
    </div>
  );
};

export default Recommendations;
