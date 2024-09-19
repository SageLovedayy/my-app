import React, { useState } from "react";
import Layout from "@/components/layout";
import { Input } from "@mui/material";

// Sidebar component for navigation
const ProfileSidebar = ({ currentSection, setCurrentSection }) => {
  return (
    <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow">
      <ul className="space-y-4">
        <li>
          <button
            className={`w-full text-left ${
              currentSection === "personal"
                ? "text-fea233 font-bold"
                : "text-gray-700"
            }`}
            onClick={() => setCurrentSection("personal")}
          >
            Personal Information
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left ${
              currentSection === "account"
                ? "text-fea233 font-bold"
                : "text-gray-700"
            }`}
            onClick={() => setCurrentSection("account")}
          >
            Account Settings
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left ${
              currentSection === "history"
                ? "text-fea233 font-bold"
                : "text-gray-700"
            }`}
            onClick={() => setCurrentSection("history")}
          >
            Fitness History
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left ${
              currentSection === "community"
                ? "text-fea233 font-bold"
                : "text-gray-700"
            }`}
            onClick={() => setCurrentSection("community")}
          >
            Community Feed
          </button>
        </li>
      </ul>
    </div>
  );
};

// Personal Information section
const PersonalInformation = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700">Profile Picture</label>
        <input type="file" className="w-full border-gray-300 p-2 rounded-lg" />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700">Username</label>
        <input
          type="text"
          className="w-full border-gray-300 p-2 rounded-lg"
          placeholder="Username"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700">Email Address</label>
        <input
          type="email"
          className="w-full border-gray-300 p-2 rounded-lg"
          placeholder="Email Address"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-gray-700">Age</label>
          <input
            type="number"
            className="w-full border-gray-300 p-2 rounded-lg"
            placeholder="Age"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Weight (kg)</label>
          <input
            type="number"
            className="w-full border-gray-300 p-2 rounded-lg"
            placeholder="Weight"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Height (cm)</label>
          <input
            type="number"
            className="w-full border-gray-300 p-2 rounded-lg"
            placeholder="Height"
          />
        </div>
      </div>
    </div>
  );
};

// Account Settings section
const AccountSettings = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700">Change Password</label>
        <input
          type="password"
          className="w-full border-gray-300 p-2 rounded-lg"
          placeholder="New Password"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700">
          Notification Preferences
        </label>
        <select className="w-full border-gray-300 p-2 rounded-lg">
          <option>Email</option>
          <option>In-App</option>
          <option>Email and In-App</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700">Linked Accounts</label>
        <input
          type="text"
          className="w-full border-gray-300 p-2 rounded-lg"
          placeholder="Connected Health Apps"
        />
      </div>
    </div>
  );
};

// Fitness History section
const FitnessHistory = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Fitness History</h2>
      <p>Here you can see your workout log and progress summary over time.</p>
      {/* Example of workout log */}
      <ul className="mt-4 space-y-4">
        <li className="p-4 bg-gray-100 rounded-lg">
          <strong>Date:</strong> 2024-09-01 | <strong>Workout:</strong> Full
          Body | <strong>Duration:</strong> 45 mins
        </li>
        <li className="p-4 bg-gray-100 rounded-lg">
          <strong>Date:</strong> 2024-08-31 | <strong>Workout:</strong> Cardio |{" "}
          <strong>Duration:</strong> 30 mins
        </li>
      </ul>
    </div>
  );
};

// Community Feed section
const CommunityFeed = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Community Feed</h2>
      <p>See updates from followed users and fitness communities.</p>
      {/* Example of community activity */}
      <ul className="mt-4 space-y-4">
        <li className="p-4 bg-gray-100 rounded-lg">
          <strong>John Doe</strong> completed a 5K run!
        </li>
        <li className="p-4 bg-gray-100 rounded-lg">
          <strong>Jane Smith</strong> reached her weekly workout goal!
        </li>
      </ul>
    </div>
  );
};

export default function HealthProfile() {
  const [currentSection, setCurrentSection] = useState("personal");

  return (
    <Layout>
      <div className="flex flex-col md:flex-row p-8 space-y-8 md:space-y-0 md:space-x-8">
        {/* Sidebar */}
        <ProfileSidebar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />

        {/* Main Content Area */}
        <div className="w-full md:w-3/4">
          {currentSection === "personal" && <PersonalInformation />}
          {currentSection === "account" && <AccountSettings />}
          {currentSection === "history" && <FitnessHistory />}
          {currentSection === "community" && <CommunityFeed />}
        </div>
      </div>
    </Layout>
  );
}
