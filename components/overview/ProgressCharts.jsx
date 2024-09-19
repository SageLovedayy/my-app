import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary elements for your charts
Chart.register(
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const weightData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Weight (kg)",
      data: [75, 74, 73, 72, 71],
      borderColor: "#fea233",
      backgroundColor: "rgba(254, 162, 51, 0.3)",
      fill: true,
    },
  ],
};

const workoutFrequencyData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Workouts",
      data: [3, 4, 2, 5],
      backgroundColor: "#fea233",
    },
  ],
};

const caloriesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Calories Burned",
      data: [500, 600, 550, 620, 580],
      borderColor: "#fea233",
      backgroundColor: "rgba(254, 162, 51, 0.3)",
      fill: true,
    },
  ],
};

const workoutDurationData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Workout Duration (mins)",
      data: [300, 450, 400, 500, 450],
      borderColor: "#6e6e6e",
      backgroundColor: "rgba(110, 110, 110, 0.3)",
      fill: true,
    },
  ],
};

const ProgressCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Weight Loss/Gain
        </h3>
        <Line data={weightData} />
      </div>
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Workout Frequency
        </h3>
        <Bar data={workoutFrequencyData} />
      </div>
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Calories Burned Trend
        </h3>
        <Line data={caloriesData} />
      </div>
      {/* New Workout Duration Trend Chart */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Workout Duration Trend
        </h3>
        <Line data={workoutDurationData} />
      </div>
    </div>
  );
};

export default ProgressCharts;
