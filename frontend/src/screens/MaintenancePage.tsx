import React from "react";
export default function MaintenancePage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center px-6">
        <h1 className="text-4xl font-bold mb-4">🚧 Under Maintenance 🚧</h1>
        <p className="text-lg mb-6">
          currently updating the project. Stay tuned!
        </p>
        <a
          href="https://github.com/369koushil"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition"
        >
          Visit project Github repo
        </a>
      </div>
    );
  }
  