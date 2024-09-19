import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register the elements
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const WeightCard = () => {
  const [weightData, setWeightData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [70, 72, 68, 66, 71, 73, 69],
        borderColor: "#fea233",
        backgroundColor: "rgba(254, 162, 51, 0.2)",
        fill: true,
        pointRadius: 5,
      },
    ],
  });

  const weightOptions = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ": " + tooltipItem.raw + "kg";
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.1, // Smoothness of the line
      },
      point: {
        radius: 4, // Size of points
      },
    },
    scales: {
      y: {
        suggestedMin: 60,
        suggestedMax: 80,
        ticks: {
          callback: function (value) {
            return value + " kg";
          },
        },
      },
      x: {
        beginAtZero: true,
      },
    },
  };

  // Example BMI data
  const bmiData = {
    currentBMI: 24, // User's current BMI
    bmiRange: {
      low: 18.5,
      healthy: 24.9,
      high: 29.9,
    },
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Weight Card</h3>
        <button className="px-4 py-2 bg-[#fea233] text-white rounded-lg">
          Log Weight
        </button>
      </div>
      <div className="mb-4">
        <div className="flex gap-4">
          <div className="text-lg font-medium text-gray-800 mb-2">
            Current Weight: {69} kg
          </div>
          <div className="text-md text-gray-600 mb-2">
            Heaviest Weight: {73} kg
          </div>
          <div className="text-md text-gray-600 mb-4">
            Lightest Weight: {66} kg
          </div>
        </div>
        <div className="w-full mb-6">
          <Line data={weightData} options={weightOptions} />
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            BMI Range
          </h4>
          <div className="relative h-12 bg-gray-200 rounded-full">
            <div
              className="absolute h-full bg-green-500 rounded-full"
              style={{
                width: `${
                  ((bmiData.currentBMI - bmiData.bmiRange.low) /
                    (bmiData.bmiRange.high - bmiData.bmiRange.low)) *
                  100
                }%`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <span className="text-xs text-gray-600">
                {bmiData.bmiRange.low}
              </span>
              <span className="text-xs text-gray-600">
                {bmiData.bmiRange.healthy}
              </span>
              <span className="text-xs text-gray-600">
                {bmiData.bmiRange.high}
              </span>
            </div>
          </div>
          <div className="mt-2 text-gray-600">
            Current BMI: {bmiData.currentBMI}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightCard;
