// src/pages/Profile.tsx
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/ui/Layout";

interface Session {
  id: number;
  date: Date;
  stationName: string;
  score: number;
  feedback: string;
}

const allStations = [
  "Cardiology",
  "Respiratory",
  "Neurology",
  "Gastroenterology",
  "Musculoskeletal",
  "Communication",
  "Ethics",
];

interface ProfileProps {
  sessions: Session[];
}

const Profile: React.FC<ProfileProps> = ({ sessions }) => {
  const { user, signOut } = useAuth();

  if (!user) {
    return <p>Loading user info...</p>;
  }

  const practicedStations = Array.from(
    new Set(sessions.map((s) => s.stationName))
  );

  const practicedPercent = Math.round(
    (practicedStations.length / allStations.length) * 100
  );

  const pendingStations = allStations.filter(
    (station) => !practicedStations.includes(station)
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <section className="bg-white p-6 rounded shadow space-y-3">
        <p>
          <strong>Name:</strong> {user.user_metadata.full_name || user.email}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </section>

      <section className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-3">Stations Practiced</h2>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
          <div
            className="bg-blue-600 h-4"
            style={{ width: `${practicedPercent}%` }}
          />
        </div>
        <p>{practicedPercent}% completed</p>

        <div className="mt-4 flex gap-6">
          <div className="flex-1">
            <h3 className="font-semibold">Practiced Stations</h3>
            {practicedStations.length === 0 ? (
              <p>No stations practiced yet.</p>
            ) : (
              <ul className="list-disc list-inside">
                {practicedStations.map((station) => (
                  <li key={station}>{station}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">Pending Stations</h3>
            {pendingStations.length === 0 ? (
              <p>All stations practiced!</p>
            ) : (
              <ul className="list-disc list-inside">
                {pendingStations.map((station) => (
                  <li key={station}>{station}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </section>
    </Layout>
  );
};

export default Profile;
