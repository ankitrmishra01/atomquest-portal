import "./index.css";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <header className="bg-white shadow">
              <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-blue-600">
                  🎯 AtomQuest Portal
                </h1>

                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Login
                </Link>
              </nav>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Goal Setting & Tracking Portal
                </h2>

                <p className="text-xl text-gray-600 mb-8">
                  Manage your goals, track achievements, and drive
                  organizational success
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">
                      📋 Create Goals
                    </h3>

                    <p className="text-gray-600">
                      Define your goals with clear targets and weightage
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                    <h3 className="text-2xl font-bold text-green-600 mb-2">
                      ✅ Track Progress
                    </h3>

                    <p className="text-gray-600">
                      Log achievements and monitor progress in real-time
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                    <h3 className="text-2xl font-bold text-purple-600 mb-2">
                      📊 Analytics
                    </h3>

                    <p className="text-gray-600">
                      View insights and performance heatmaps
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        }
      />

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
