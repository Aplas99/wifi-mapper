// src/App.jsx
import React, { useState } from "react";

export default function App() {
  const [floorImg, setFloorImg] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFloorImg(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Wi‑Fi Mapper</h1>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition">
            Load
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition">
            Save
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Controls */}
        <aside className="w-72 bg-white border-r p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Controls</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-600 mb-2">
                Import Floor Plan
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-700"
                onChange={handleUpload}
              />
            </div>

            <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition">
              Run Wi‑Fi Test Here
            </button>

            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Legend
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-red-500 inline-block rounded-full mr-2"></span>
                  Weak Signal
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-yellow-400 inline-block rounded-full mr-2"></span>
                  Moderate Signal
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 inline-block rounded-full mr-2"></span>
                  Strong Signal
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Mapping Area */}
        <main className="flex-1 relative bg-gray-200 p-4">
          {floorImg ? (
            <div className="relative h-full">
              <img
                src={floorImg}
                alt="Floor Plan"
                className="object-contain w-full h-full"
              />
              {/* Canvas overlay goes here */}
              <div className="absolute inset-0">
                {/* Placeholder for Konva Stage */}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 italic">
              Upload a floor plan to begin mapping Wi‑Fi strength.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
