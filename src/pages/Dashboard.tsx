import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "@/components/ui/button";
import TopicProgressSection from "@/components/TopicProgressSection";
import DashboardStats from "@/components/ui/DashboardStats";
import RecentActivity from "@/components/ui/RecentActivity";
import QuickActions from "@/components/ui/QuickActions";
import { Outlet, useLocation } from "react-router-dom";

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

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [sessions, setSessions] = useState<Session[]>([]);
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

  // Verificar se estamos na rota principal do dashboard
  const isMainDashboard = location.pathname === 
'/dashboard'
 || location.pathname === 
'/dashboard/'
;

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
      <UnifiedHeader />
      <main className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-6 overflow-x-hidden">
        {/* Conteúdo principal */}
        <section className="flex-1 max-w-4xl">
          {isMainDashboard ? (
            <div className="space-y-6">
              {/* Estatísticas do Dashboard */}
              <DashboardStats />
              
              {/* Grid com Ações Rápidas e Atividade Recente */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuickActions />
                <RecentActivity />
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </section>

        {/* Sidebar com Progresso dos Tópicos */}
        <aside className="lg:w-80 w-full">
          <div className="bg-card border rounded-lg p-6">
            <TopicProgressSection />
          </div>
        </aside>
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



