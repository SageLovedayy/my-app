import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
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
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const WeightCard = () => {
  // Initialize with empty data
  const [weightData, setWeightData] = useState({
    labels: [],
    datasets: [
      {
        label: "Weight (kg)",
        data: [],
        borderColor: "#fea233",
        backgroundColor: "rgba(254, 162, 51, 0.2)",
        fill: true,
        pointRadius: 5,
      },
    ],
  });

  const [currentWeight, setCurrentWeight] = useState("");
  const [height, setHeight] = useState(170); // Example height in cm

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
        tension: 0.1,
      },
      point: {
        radius: 4,
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

  // Function to calculate BMI
  const calculateBMI = (weight, height) => {
    return (weight / (height / 100) ** 2).toFixed(1); // BMI formula
  };

  // Handle form submission
  const handleLogWeight = () => {
    if (currentWeight.trim() === "") return;

    setWeightData((prevData) => ({
      labels: [...prevData.labels, `Entry ${prevData.labels.length + 1}`], // Add a label for the new entry
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, parseFloat(currentWeight)], // Add the new weight data
        },
      ],
    }));

    setCurrentWeight(""); // Clear the input after logging
  };

  // BMI data
  const bmiData = {
    currentBMI: calculateBMI(currentWeight, height),
    bmiRange: {
      low: 18.5,
      healthy: 24.9,
      high: 29.9,
    },
  };

  // Handle input change
  const handleWeightChange = (e) => {
    setCurrentWeight(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Weight Card</h3>
        <button
          onClick={handleLogWeight}
          className="px-4 py-2 bg-[#fea233] text-white rounded-lg"
        >
          Log Weight
        </button>
      </div>
      <div className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="weight">
            Weight (kg):
          </label>
          <input
            id="weight"
            type="number"
            value={currentWeight}
            onChange={handleWeightChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="height">
            Height (cm):
          </label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={handleHeightChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="text-lg font-medium text-gray-800 mb-2">
          Current Weight: {currentWeight} kg
        </div>
        <div className="text-md text-gray-600 mb-2">
          Heaviest Weight: {Math.max(...weightData.datasets[0].data)} kg
        </div>
        <div className="text-md text-gray-600 mb-4">
          Lightest Weight: {Math.min(...weightData.datasets[0].data)} kg
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
                width: `${Math.min(
                  Math.max(
                    ((bmiData.currentBMI - bmiData.bmiRange.low) /
                      (bmiData.bmiRange.high - bmiData.bmiRange.low)) *
                      100,
                    0
                  ),
                  100
                )}%`,
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
