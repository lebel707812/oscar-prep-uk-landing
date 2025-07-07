import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/Header";
import NotificationsContainer from "@/components/ui/NotificationsContainer";
import { notify } from "@/components/ui/NotificationsContainer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Session {
  id: number;
  date: Date;
  stationName: string;
  score?: number;
  feedback?: string;
}

const allStations = [
  "Cardiology",
  "Respiratory",
  "Neurology",
  "Gastroenterology",
  "Musculoskeletal",
  "Communication",
  "Ethics",
  "Infection Control",
  "Medication Management",
  "Emergency Care",
  "Mental Health Nursing",
  "Paediatric Nursing",
  "Elderly Care",
  "Documentation and Professionalism",
];

const totalSessionsPerSubject = 5;

interface DashboardProps {
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}

const Dashboard: React.FC<DashboardProps> = ({ sessions, setSessions }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stationName, setStationName] = useState("");
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "completed" | "upcoming" | "notes"
  >("completed");
  const [notes, setNotes] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Cálculo do progresso para cada matéria
  const subjectProgress = allStations.map((subject) => {
    const completedCount = sessions.filter(
      (s) => s.stationName === subject && s.score !== undefined
    ).length;

    const progress = Math.min(
      (completedCount / totalSessionsPerSubject) * 100,
      100
    );

    return { subject, progress };
  });

  const completedSessions = sessions.filter((s) => s.date <= today);
  const upcomingSessions = sessions.filter((s) => s.date > today);

  const graphData = completedSessions
    .slice()
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((s) => ({
      date: format(s.date, "dd/MM"),
      score: s.score ?? 0,
    }));

  const openAddSessionModal = () => {
    if (!selectedDate) {
      notify("error", "Please select a date first.");
      return;
    }

    const selDateNoTime = new Date(selectedDate);
    selDateNoTime.setHours(0, 0, 0, 0);

    if (activeTab === "completed" && selDateNoTime > today) {
      notify("error", "Completed sessions must be today or in the past.");
      return;
    }

    if (activeTab === "upcoming" && selDateNoTime <= today) {
      notify("error", "Upcoming sessions must be in the future.");
      return;
    }

    setIsModalOpen(true);
  };

  const handleAddSession = async () => {
    if (!selectedDate) {
      notify("error", "Please select a date.");
      return;
    }

    const selDateNoTime = new Date(selectedDate);
    selDateNoTime.setHours(0, 0, 0, 0);

    if (!stationName) {
      notify("error", "Station name is required.");
      return;
    }

    if (activeTab === "completed" && (!score || selDateNoTime > today)) {
      notify("error", "Provide score and select a valid past date.");
      return;
    }

    if (activeTab === "upcoming" && selDateNoTime <= today) {
      notify("error", "Upcoming sessions must be in the future.");
      return;
    }

    setIsSaving(true);
    try {
      const newSession: Session =
        activeTab === "completed"
          ? {
              id: Date.now(),
              date: selDateNoTime,
              stationName,
              score: Number(score),
              feedback,
            }
          : {
              id: Date.now(),
              date: selDateNoTime,
              stationName,
            };
      setSessions((prev) => [...prev, newSession]);

      notify("success", "Session saved successfully.");
      setStationName("");
      setScore("");
      setFeedback("");
      setIsModalOpen(false);
    } catch {
      notify("error", "Failed to save session.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotes = () => {
    notify("success", "Notes saved successfully.");
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-6 overflow-x-hidden">
        {/* Conteúdo principal */}
        <section className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-900 center">
            OSCE Dashboard
          </h1>

          <div className="flex space-x-3 mb-2">
            <Button
              variant={activeTab === "completed" ? "default" : "outline"}
              onClick={() => setActiveTab("completed")}
            >
              Completed Sessions
            </Button>
            <Button
              variant={activeTab === "upcoming" ? "default" : "outline"}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Sessions
            </Button>
            <Button
              variant={activeTab === "notes" ? "default" : "outline"}
              onClick={() => setActiveTab("notes")}
            >
              Notes
            </Button>
          </div>

          {activeTab === "completed" && (
            <>
              <div className="flex justify-center my-6">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={{ from: today, after: undefined }}
                  footer={
                    selectedDate
                      ? `Selected date: ${format(selectedDate, "PP")}`
                      : "Select a past or current date"
                  }
                />
              </div>

              {selectedDate && (
                <ul className="mt-4 space-y-3">
                  {completedSessions
                    .filter(
                      (s) => s.date.toDateString() === selectedDate.toDateString()
                    )
                    .map((s) => (
                      <li key={s.id} className="p-4 bg-gray-50 border rounded-md">
                        <strong>{s.stationName}</strong> — Score:{" "}
                        <span className="font-semibold">{s.score}</span>
                        <br />
                        Feedback: {s.feedback || "None"}
                      </li>
                    ))}
                </ul>
              )}
              <div className="flex justify-center mb-6 dark:text-gray-800">
                  <Button onClick={openAddSessionModal}>Add Completed Session</Button>
              </div>
              {graphData.length > 0 && (
                <section className="mt-10 w-full">
                   <h2 className="text-xl font-semibold mb-4">Progress</h2>
                   <ResponsiveContainer width="200%" height={400}>
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot
                    />
                  </LineChart>
                </ResponsiveContainer>
              </section>
              )}
            </>
          )}

          {activeTab === "upcoming" && (
            <>
              <div className="flex justify-center my-6">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={{ before: new Date(today.getTime() + 86400000) }}
                  footer={
                    selectedDate
                      ? `Selected date: ${format(selectedDate, "PP")}`
                      : "Select a future date"
                  }
                />                    
              </div>
              <ul className="mt-6 space-y-3">
                {upcomingSessions.map((s) => (
                  <li key={s.id} className="border p-4 rounded-md bg-white">
                    <strong>{s.stationName}</strong> —{" "}
                    {format(s.date, "PPP")}
                  </li>
                ))}
              </ul>

              <div className="flex justify-center mb-6 text-gray-00 dark:text-gray-100">
          <Button onClick={openAddSessionModal}>Add Completed Session</Button>
        </div>

            </>
          )}

          {activeTab === "notes" && (
            <section className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-semibold mb-4 dark:text-gray-800 ">Notes</h2>
              <textarea
                className="w-full border rounded p-4"
                rows={6}
                placeholder="Write your notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button onClick={handleSaveNotes} className="mt-4">
                Save Notes
              </Button>
            </section>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg max-w-md w-full dark:bg-gray-800">
                <h3 className="text-xl font-bold mb-4">
                  {activeTab === "completed"
                    ? "Add Completed Session"
                    : "Add Upcoming Session"}
                </h3>
                <div className="space-y-4">
                <select
                  className="w-full border rounded px-4 py-2 dark:text-gray-800"
                  value={stationName}
                  onChange={(e) => setStationName(e.target.value)}
                >
                  <option value="">Select a Station</option>
                  {allStations.map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
                  {activeTab === "completed" && (
                    <>
                      <div>
                    <label htmlFor="score" className="block mb-1 font-medium text-sm text-gray-700 dark:text-gray-200">
                          Score: {score || 0}
                        </label>
                        <input
                          id="score"
                          type="range"
                          min={0}
                          max={100}
                          step={1}
                          value={score}
                          onChange={(e) => setScore(e.target.value)}
                          className="w-full"
                        />
                  </div>
                      <textarea
                        className="w-full border rounded px-4 py-2"
                        placeholder="Feedback (optional)"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                    </>
                  )}
                  <div className="flex justify-end gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddSession} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Painel lateral com progresso */}
        <aside className="w-full lg:w-100 p-4 bg-white rounded-lg shadow self-start">
    <h2 className="text-xl font-semibold mb-5 text-center dark:text-gray-800">
      Progress by Subject
    </h2>
    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
      {subjectProgress.map(({ subject, progress }) => (
        <div key={subject}>
          <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-800 mb-1">
            <span className="truncate w-[60%]">{subject}</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </aside>
      </main>

      <NotificationsContainer />
    </>
  );
};

export default Dashboard;
