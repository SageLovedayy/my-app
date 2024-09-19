import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Layout from "@/components/layout";
import { Input } from "@mui/material";

import WeightCard from "@/components/charts/weightCard";

import {
  Chart as ChartJS,
  ArcElement, // For Doughnut/Donut charts
  LineElement, // For Line charts
  BarElement, // For Bar charts
  CategoryScale, // For the x-axis
  LinearScale, // For the y-axis
  PointElement, // For points on the Line chart
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register the elements
ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const doughnutOptions = {
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.label + ": " + tooltipItem.raw + "%";
        },
      },
    },
  },
  cutout: "50%", // Adjust the cutout percentage to control inner circle size
};

export default function Charts() {
  // Example data for charts
  const weightData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Weight Lifted (kg)",
        data: [30, 45, 60, 55, 70, 65, 80],
        borderColor: "#fea233",
        backgroundColor: "#fea23333",
        fill: true,
      },
    ],
  };

  const repsData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Reps Performed",
        data: [200, 250, 300, 280, 350],
        borderColor: "#6e6e6e",
        backgroundColor: "#6e6e6e33",
        fill: true,
      },
    ],
  };

  const caloriesData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Calories Burned",
        data: [500, 600, 750, 800],
        borderColor: "#a1a1a1",
        backgroundColor: "#a1a1a133",
        fill: true,
      },
    ],
  };

  const seriesData = {
    labels: ["Workout 1", "Workout 2", "Workout 3", "Workout 4"],
    datasets: [
      {
        label: "Series Completed",
        data: [4, 6, 3, 5],
        backgroundColor: ["#fea233", "#6e6e6e", "#a1a1a1", "#6e6e6e"],
      },
    ],
  };

  const workoutTypeDistribution = {
    labels: ["Cardio", "Strength", "Flexibility", "Balance"],
    datasets: [
      {
        label: "Workout Types",
        data: [35, 40, 15, 10],
        backgroundColor: ["#fea233", "#6e6e6e", "#a1a1a1", "#6e6e6e"],
        hoverBackgroundColor: [
          "#fea233dd",
          "#6e6e6edd",
          "#a1a1a1dd",
          "#6e6e6edd",
        ],
      },
    ],
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Top section with filters (optional for timeframe selection) */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Progress Charts
          </h2>
          {/* Filter options for timeframes */}
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-fea233 text-black rounded-lg">
              Weekly
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
              Monthly
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
              Yearly
            </button>
          </div>
        </div>

        {/* Main Content - Progress Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donut Chart - Workout Types Distribution */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Workout Type Distribution
            </h3>
            <div className="w-full max-w-[30rem] mx-auto">
              {" "}
              {/* Control the container size */}
              <Doughnut
                data={workoutTypeDistribution}
                options={doughnutOptions}
              />
            </div>
          </div>

          <WeightCard />

          {/* Weight Lifted Chart */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Weight Lifted
            </h3>
            <Line data={weightData} />
          </div>

          {/* Reps Performed Chart */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Reps Performed
            </h3>
            <Line data={repsData} />
          </div>

          {/* Calories Burned Chart */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Calories Burned
            </h3>
            <Line data={caloriesData} />
          </div>

          {/* Series Completed Bar Chart */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Series Completed
            </h3>
            <Bar data={seriesData} />
          </div>
        </div>

        {/* Data Export / Goal Visualization */}
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-fea233 text-white rounded-lg">
            Export Data
          </button>
        </div>
      </div>
    </Layout>
  );
}
