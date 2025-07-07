import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/Header";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  fetchUserSessions,
  saveSession,
  checkUser,
  deleteSession,
} from "@/integrations/supabase/client";

interface Session {
  id: string;
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

const stationCategories: Record<string, string> = {
  Cardiology: "Medical",
  Respiratory: "Medical",
  Neurology: "Medical",
  Gastroenterology: "Medical",
  Musculoskeletal: "Medical",
  Communication: "Soft Skills",
  Ethics: "Soft Skills",
  "Infection Control": "Medical",
  "Medication Management": "Medical",
  "Emergency Care": "Medical",
  "Mental Health Nursing": "Mental Health",
  "Paediatric Nursing": "Paediatric",
  "Elderly Care": "Geriatrics",
  "Documentation and Professionalism": "Professionalism",
};

const totalSessionsPerSubject = 5;

const Toast: React.FC<{
  message: string;
  type: "success" | "error";
  onClose: () => void;
}> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-3 rounded shadow text-white font-semibold cursor-pointer select-none z-50
      ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
      onClick={onClose}
    >
      {message}
    </div>
  );
};

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
  const [activeTab, setActiveTab] = useState<"completed" | "upcoming" | "notes">(
    "completed"
  );
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sessionIdToDelete, setSessionIdToDelete] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const categories = ["All", ...Array.from(new Set(Object.values(stationCategories)))];

  const parseDateAsLocal = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
  };

  useEffect(() => {
    const validateUser = async () => {
      const user = await checkUser();
      if (!user) {
        showToast("You must be logged in to access the dashboard.", "error");
        setTimeout(() => (window.location.href = "/login"), 2500);
      }
    };
    validateUser();
  }, []);

  useEffect(() => {
    const loadSessions = async () => {
      const sessionsFromDB = await fetchUserSessions();

      const mapped = sessionsFromDB.map((s) => ({
        id: String(s.id),
        date: new Date(s.date),
        stationName: s.station_name,
        score: s.score,
        feedback: s.feedback ?? "",
      }));

      setSessions(mapped);
    };
    loadSessions();
  }, [setSessions]);

  // Garantir que sessions seja sempre array
  const safeSessions = Array.isArray(sessions) ? sessions : [];

  const filteredStations =
    selectedCategory === "All"
      ? allStations
      : allStations.filter((station) => stationCategories[station] === selectedCategory);

  const filteredSessions = safeSessions.filter((s) =>
    filteredStations.includes(s.stationName)
  );

  const completedSessions = filteredSessions.filter((s) => s.date <= today);
  const upcomingSessions = filteredSessions.filter((s) => s.date > today);

  const subjectProgress = filteredStations.map((subject) => {
    const completedCount = completedSessions.filter(
      (s) => s.stationName === subject && s.score !== undefined
    ).length;
    const progress = Math.min((completedCount / totalSessionsPerSubject) * 100, 100);
    return { subject, progress };
  });

  const graphData = completedSessions
    .slice()
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((s) => ({
      date: format(s.date, "dd/MM"),
      score: s.score ?? 0,
    }));

  const pastSessionDates = completedSessions.map((s) => {
    const d = new Date(s.date);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const futureSessionDates = upcomingSessions.map((s) => {
    const d = new Date(s.date);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const openAddSessionModal = () => {
    if (!selectedDate) {
      showToast("Please select a date first.", "error");
      return;
    }

    const selDateNoTime = new Date(selectedDate);
    selDateNoTime.setHours(0, 0, 0, 0);

    if (activeTab === "completed" && selDateNoTime > today) {
      showToast("Completed sessions must be today or in the past.", "error");
      return;
    }

    if (activeTab === "upcoming" && selDateNoTime <= today) {
      showToast("Upcoming sessions must be in the future.", "error");
      return;
    }

    if (!isEditing) {
      setStationName("");
      setScore("");
      setFeedback("");
    }
    setIsModalOpen(true);
  };

  const handleEditSession = (session: Session) => {
    setSelectedDate(new Date(session.date));
    setStationName(session.stationName);
    setScore(session.score?.toString() ?? "");
    setFeedback(session.feedback ?? "");
    setIsEditing(true);
    setEditingSessionId(session.id);
    setIsModalOpen(true);
  };

  const confirmDeleteSession = (id: string) => {
    setSessionIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSession = async () => {
    if (sessionIdToDelete === null) return;
    setIsDeleteModalOpen(false);
    try {
      const result = await deleteSession(sessionIdToDelete);
      if (result.error) {
        showToast("Failed to delete session.", "error");
      } else {
        setSessions((prev) => prev.filter((s) => s.id !== sessionIdToDelete));
        showToast("Session deleted.", "success");
      }
    } catch {
      showToast("Failed to delete session.", "error");
    }
    setSessionIdToDelete(null);
  };

  const handleSaveSession = async () => {
    if (!selectedDate) {
      showToast("Please select a date.", "error");
      return;
    }

    const selDateNoTime = new Date(selectedDate);
    selDateNoTime.setHours(0, 0, 0, 0);

    if (!stationName) {
      showToast("Station name is required.", "error");
      return;
    }

    if (activeTab === "completed" && (!score || selDateNoTime > today)) {
      showToast("Provide score and select a valid past date.", "error");
      return;
    }

    if (activeTab === "upcoming" && selDateNoTime <= today) {
      showToast("Upcoming sessions must be in the future.", "error");
      return;
    }

    setIsSaving(true);
    try {
      const sessionToSave = {
        id: editingSessionId ?? undefined,
        date: selDateNoTime,
        stationName,
        score: activeTab === "completed" ? Number(score) : undefined,
        feedback: activeTab === "completed" ? feedback : undefined,
      };

      const result = await saveSession(sessionToSave);

      if (result.error) {
        showToast("Failed to save session.", "error");
      } else {
        showToast("Session saved successfully.", "success");

        if (isEditing && editingSessionId !== null) {
          setSessions((prev) =>
            prev.map((s) =>
              s.id === editingSessionId ? { ...s, ...sessionToSave, id: editingSessionId } : s
            )
          );
        } else {
          const newId =
            (result as any).data?.[0]?.id
              ? String((result as any).data[0].id)
              : typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : String(Date.now());

          setSessions((prev) => [...prev, { ...sessionToSave, id: newId }]);
        }
      }

      setStationName("");
      setScore("");
      setFeedback("");
      setIsModalOpen(false);
      setIsEditing(false);
      setEditingSessionId(null);
    } catch {
      showToast("Failed to save session.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotes = () => {
    showToast("Notes saved successfully.", "success");
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-6 overflow-x-hidden">
        <section className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-900 center">OSCE Dashboard</h1>

          <div className="mb-6">
            <label
              htmlFor="category-select"
              className="block font-semibold mb-2 dark:text-gray-800"
            >
              Filter by Category:
            </label>
            <select
              id="category-select"
              className="border rounded px-4 py-2 w-full max-w-xs dark:text-gray-800"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

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
                  disabled={{ after: today }}
                  modifiers={{
                    futureSession: futureSessionDates,
                    pastSession: pastSessionDates,
                    today: today,
                  }}
                  modifiersClassNames={{
                    futureSession: "bg-blue-700 text-white rounded-full",
                    pastSession: "bg-blue-300 text-white rounded-full",
                    today: "font-bold border border-blue-500",
                  }}
                  footer={
                    selectedDate
                      ? `Selected date: ${format(selectedDate, "PP")}`
                      : "Select a past date"
                  }
                />
              </div>
              <div className="flex justify-center mb-6 dark:text-gray-800">
                <Button onClick={openAddSessionModal}>Add Completed Session</Button>
              </div>
              {selectedDate && (
                <ul className="mt-4 space-y-3">
                  {completedSessions
                    .filter(
                      (s) => s.date.toDateString() === selectedDate.toDateString()
                    )
                    .map((s) => (
                      <li
                        key={s.id}
                        className="p-4 bg-gray-50 border rounded-md relative"
                      >
                        <strong>{s.stationName}</strong> — Score:{" "}
                        <span className="font-semibold">{s.score}</span>
                        <br />
                        Feedback: {s.feedback || "None"}

                        <div className="absolute top-2 right-2 flex space-x-2">
                          <button
                            onClick={() => handleEditSession(s)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => confirmDeleteSession(s.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            ❌
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              )}

              {graphData.length > 0 && (
                <section className="mt-10 w-full">
                  <h2 className="text-xl font-semibold mb-4">Progress</h2>
                  <ResponsiveContainer width="100%" height={400}>
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
                  modifiers={{
                    futureSession: futureSessionDates,
                    pastSession: pastSessionDates,
                    today: today,
                  }}
                  modifiersClassNames={{
                    futureSession: "bg-blue-700 text-white rounded-full",
                    pastSession: "bg-blue-300 text-white rounded-full",
                    today: "font-bold border border-blue-500",
                  }}
                  footer={
                    selectedDate
                      ? `Selected date: ${format(selectedDate, "PP")}`
                      : "Select a future date"
                  }
                />
              </div>
              <div className="flex justify-center mb-6 text-gray-00 dark:text-gray-100">
                <Button onClick={openAddSessionModal}>Add Upcoming Session</Button>
              </div>
              <ul className="mt-6 space-y-3">
                {upcomingSessions.map((s) => (
                  <li
                    key={s.id}
                    className="border p-4 rounded-md bg-white relative"
                  >
                    <strong>{s.stationName}</strong> — {format(s.date, "PPP")}

                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => handleEditSession(s)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => confirmDeleteSession(s.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {activeTab === "notes" && (
            <section className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-semibold mb-4 dark:text-gray-800">Notes</h2>
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

          {/* Modal adicionar/editar sessão */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">
                  {isEditing ? "Edit Session" : "Add Session"}
                </h3>

                <div className="mb-4">
                  <label className="block font-semibold mb-1" htmlFor="session-date">
                    Date
                  </label>
                  <input
                    type="date"
                    id="session-date"
                    value={
                      selectedDate ? selectedDate.toISOString().substring(0, 10) : ""
                    }
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-1" htmlFor="station-name">
                    Station Name
                  </label>
                  <select
                    id="station-name"
                    value={stationName}
                    onChange={(e) => setStationName(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Station</option>
                    {filteredStations.map((station) => (
                      <option key={station} value={station}>
                        {station}
                      </option>
                    ))}
                  </select>
                </div>

                {activeTab === "completed" && (
                  <>
                    <div className="mb-4">
                      <label className="block font-semibold mb-1" htmlFor="score">
                        Score (0-100)
                      </label>
                      <input
                        type="number"
                        id="score"
                        min={0}
                        max={100}
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-semibold mb-1" htmlFor="feedback">
                        Feedback
                      </label>
                      <textarea
                        id="feedback"
                        rows={3}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsEditing(false);
                      setEditingSessionId(null);
                      setStationName("");
                      setScore("");
                      setFeedback("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSession} disabled={isSaving}>
                    {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Add Session"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Modal confirmar exclusão */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow max-w-sm w-full">
                <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                <p>Are you sure you want to delete this session?</p>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteSession}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </>
  );
};

export default Dashboard;
