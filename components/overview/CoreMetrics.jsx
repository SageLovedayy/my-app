import React from "react";

const MetricCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
      <div className="text-yellow-500">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

const CoreMetrics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard icon="🏋️" title="Total Workouts" value="128" />
      <MetricCard icon="🔥" title="Calories Burned" value="15,000" />
      <MetricCard icon="🕒" title="Workout Time" value="48 hours" />
      <MetricCard icon="📅" title="Active Days" value="45" />
    </div>
  );
};

export default CoreMetrics;
