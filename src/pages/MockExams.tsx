// src/pages/MockExams.tsx
import React, { useState } from "react";
import Layout from "@/components/ui/Layout"; // o layout novo
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface MockExam {
  id: number;
  name: string;
  description: string;
  stationsCount: number;
  durationMinutes: number;
}

interface CompletedExam {
  id: number;
  examId: number;
  date: Date;
  score: number;
}

const mockExams: MockExam[] = [
  {
    id: 1,
    name: "Basic Clinical Skills",
    description: "Test your core clinical skills across common stations.",
    stationsCount: 5,
    durationMinutes: 45,
  },
  {
    id: 2,
    name: "Advanced Communication",
    description: "Focus on communication and ethical scenarios.",
    stationsCount: 4,
    durationMinutes: 40,
  },
  {
    id: 3,
    name: "Full OSCE Practice",
    description: "Complete full OSCE simulation with 10 stations.",
    stationsCount: 10,
    durationMinutes: 90,
  },
];

const completedExamsExample: CompletedExam[] = [
  {
    id: 1,
    examId: 1,
    date: new Date("2025-06-15T10:00:00"),
    score: 85,
  },
  {
    id: 2,
    examId: 2,
    date: new Date("2025-06-20T14:30:00"),
    score: 92,
  },
];

const MockExams = () => {
  const [completedExams] = useState<CompletedExam[]>(completedExamsExample);

  const getExamNameById = (id: number) => {
    const exam = mockExams.find((e) => e.id === id);
    return exam ? exam.name : "Unknown Exam";
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Mock Exams</h1>

      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Simulated Exams</h2>
          <div className="space-y-6">
            {mockExams.map((exam) => (
              <div
                key={exam.id}
                className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer"
              >
                <h3 className="text-lg font-semibold">{exam.name}</h3>
                <p className="mb-2">{exam.description}</p>
                <p className="mb-2">
                  Stations: <strong>{exam.stationsCount}</strong> | Duration: <strong>{exam.durationMinutes} min</strong>
                </p>
                <Button onClick={() => alert(`Starting "${exam.name}" (not implemented)`)}>Start</Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Completed Exams History</h2>
          {completedExams.length === 0 ? (
            <p>No mock exams completed yet.</p>
          ) : (
            <ul className="space-y-3">
              {completedExams.map((completed) => (
                <li
                  key={completed.id}
                  className="border rounded p-3 shadow flex justify-between items-center"
                >
                  <div>
                    <strong>{getExamNameById(completed.examId)}</strong> — {format(completed.date, "PPP p")}
                  </div>
                  <div>
                    Score: <span className="font-semibold">{completed.score}%</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MockExams;
