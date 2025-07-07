// src/pages/MockExams.tsx
import React, { useState } from "react";
import Layout from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";


interface CompletedExam {
  id: number;
  topicId: string;
  level: number; // 1 a 5
  date: Date;
  score: number;
}

// Lista dos 14 tópicos com IDs (você deve substituir pelos seus IDs reais)
const topics = [
  { id: "7f3c4680-03b3-4ed0-a6a8-450f6431847e", name: "Cardiology" },
  { id: "7383d682-f9c4-4047-96db-052ce7cdfd5a", name: "Respiratory" },
  { id: "7e832803-ea1e-4eb7-ae73-6a2af7fb64f5", name: "Neurology" },
  { id: "56d5a16f-1923-463b-9ec6-5c5b07087c23", name: "Infection Control" },
  { id: "84b8e0c8-7655-491f-80e0-8fe2c0a6e99f", name: "Paediatric Nursing" },
  { id: "0e524e91-3abe-400f-b701-186f048b9d87", name: "Elderly Care" },
  { id: "5be61119-0af4-4003-89f2-e7e084804717", name: "Documentation and Professionalism" },
  { id: "faa2e77e-5aa0-4bb7-b0fe-df313d99d3d6", name: "Gastroenterology" },
  { id: "7e832803-ea1e-4eb7-ae73-6a2af7fb64f5", name: "Musculoskeletal" },
  { id: "77820364-87e7-4527-8021-ee06eb005ba0", name: "Communication" },
  { id: "6f807eff-7157-4384-b4f5-781ef05b1c4e", name: "Ethics" },
  { id: "bf50a815-6f05-46a1-9b1d-b933a4d0715d", name: "Medication Management" },
  { id: "0c0576e1-87d9-4ab1-bbe1-b117b1f006e7", name: "Mental Health" },
  { id: "adce0fca-671f-4c05-a2d6-305f4c7d0601", name: "Emergency Care" },
];

// Exemplo de exames completados (simulado)
const completedExamsExample: CompletedExam[] = [
  {
    id: 1,
    topicId: "7f3c4680-03b3-4ed0-a6a8-450f6431847e",
    level: 3,
    date: new Date("2025-06-15T10:00:00"),
    score: 85,
  },
  {
    id: 2,
    topicId: "7383d682-f9c4-4047-96db-052ce7cdfd5a",
    level: 1,
    date: new Date("2025-06-20T14:30:00"),
    score: 92,
  },
];




const MockExams = () => {
  const [completedExams] = useState<CompletedExam[]>(completedExamsExample);
  const navigate = useNavigate();
  // Função para buscar nome do tópico pelo id
  const getTopicNameById = (id: string) => {
    const topic = topics.find((t) => t.id === id);
    return topic ? topic.name : "Unknown Topic";
  };

  // Handler do botão start - só placeholder por enquanto
  const handleStartExam = (topicId: string, level: number) => {
  navigate(`/mock-exam-runner?topicId=${topicId}&level=${level}`);
};


  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Mock Exams</h1>

      <section className="space-y-8">
        {/* Lista de tópicos com níveis */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Topics & Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="border rounded p-4 shadow hover:shadow-lg transition min-w-[400px]"
              >
                <h3 className="text-lg font-semibold mb-3">{topic.name}</h3>
                <div className="flex gap-3 flex-nowrap">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <Button
                      key={level}
                      variant="outline"
                       className="whitespace-nowrap px-2.5 py-1 text-sm"
                      onClick={() => handleStartExam(topic.id, level)}
                    >
                      Level {level}
                    </Button>
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Click a level to start the mock exam. Each exam consists of 10 questions.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Histórico de exames completados */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Completed Exams History</h2>
          {completedExams.length === 0 ? (
            <p>No mock exams completed yet.</p>
          ) : (
            <ul className="space-y-3 max-h-96 overflow-y-auto">
              {completedExams.map((completed) => (
                <li
                  key={completed.id}
                  className="border rounded p-3 shadow flex justify-between items-center"
                >
                  <div>
                    <strong>{getTopicNameById(completed.topicId)}</strong> — Level {completed.level} —{" "}
                    {format(completed.date, "PPP p")}
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
