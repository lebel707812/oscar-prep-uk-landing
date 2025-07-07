import React, { useEffect, useState } from "react";
import Layout from "@/components/ui/Layout";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
}

const MockExamRunner = () => {
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get("topicId");
  const level = parseInt(searchParams.get("level") || "1");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<
    { questionId: string; selected: string; correct: string }[]
  >([]);

  // Guarda o ID da sessão criada no backend
  const [examSessionId, setExamSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (topicId) {
      createSession();
    }
  }, [topicId]);

  // Cria sessão no Supabase, só então carrega perguntas
  const createSession = async () => {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      if (!userId || !topicId) return;

      const { data, error } = await supabase
        .from("exam_sessions")
        .insert([{ user_id: userId, topic_id: topicId, level }])
        .select()
        .single();

      if (error) {
        console.error("Error creating exam session:", error);
        return;
      }

      setExamSessionId(data.id);
      fetchQuestions(); // carrega perguntas só após criar sessão
    } catch (err) {
      console.error("Unexpected error creating exam session:", err);
    }
  };

  const fetchQuestions = async () => {
    const start = (level - 1) * 10;
    const end = start + 9;
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("topic_id", topicId)
      .range(start, end);

    if (error) {
      console.error("Error fetching questions", error);
    } else {
      setQuestions(data || []);
    }
  };

  const saveAnswer = async (
    questionId: string,
    selectedOption: string,
    isCorrect: boolean
  ) => {
    if (!examSessionId) return;

    const { error } = await supabase.from("exam_answers").insert([
      {
        exam_session_id: examSessionId,
        question_id: questionId,
        selected_option: selectedOption,
        is_correct: isCorrect,
      },
    ]);

    if (error) {
      console.error("Error saving answer:", error);
    }
  };

  const finishSession = async (finalScore: number) => {
    if (!examSessionId) return;

    const { error } = await supabase
      .from("exam_sessions")
      .update({ finished_at: new Date().toISOString(), score: finalScore })
      .eq("id", examSessionId);

    if (error) {
      console.error("Error finishing exam session:", error);
    }
  };

  const handleNext = async () => {
    if (!selected) return;

    const currentQuestion = questions[current];
    const correct = currentQuestion.correct_option;
    const isCorrect = selected === correct;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, selected, correct },
    ]);

    // Salva resposta no backend
    await saveAnswer(currentQuestion.id, selected, isCorrect);

    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
      await finishSession(score + (isCorrect ? 1 : 0));
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    createSession(); // cria nova sessão e carrega perguntas
  };

  if (!topicId) return <p className="p-4">Missing topicId</p>;

  const question = questions[current];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Mock Exam</h1>

        {finished ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Your Score: {score} / {questions.length}
            </h2>
            <ul className="space-y-4">
              {questions.map((q, idx) => (
                <li key={q.id} className="border p-3 rounded">
                  <p className="font-semibold mb-1">
                    Q{idx + 1}: {q.question_text}
                  </p>
                  <p className="mb-1">
                    <strong>Your answer:</strong> {answers[idx]?.selected}{" "}
                    {answers[idx]?.selected === answers[idx]?.correct ? " ✅" : " ❌"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                </li>
              ))}
            </ul>
            <Button className="mt-4" onClick={restart}>
              Try Again
            </Button>
          </div>
        ) : question ? (
          <div className="space-y-4">
            <p className="text-lg font-semibold">
              Question {current + 1} of {questions.length}
            </p>
            <p>{question.question_text}</p>
            <div className="space-y-2">
              {(["a", "b", "c", "d"] as const).map((key) => (
                <div
                  key={key}
                  className={`border p-2 rounded cursor-pointer ${
                    selected === key ? "border-blue-500 bg-blue-100" : ""
                  }`}
                  onClick={() => setSelected(key)}
                >
                  {key.toUpperCase()}. {question[`option_${key}`]}
                </div>
              ))}
            </div>
            <Button onClick={handleNext} disabled={!selected}>
              Next
            </Button>
          </div>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </Layout>
  );
};

export default MockExamRunner;
