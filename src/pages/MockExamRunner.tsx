import React, { useEffect, useState, useRef } from "react";
import Layout from "@/components/ui/Layout";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string; // texto da resposta correta
  explanation: string;
}

const TIME_PER_QUESTION = 120; // 2 minutos em segundos

const MockExamRunner = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const topicId = searchParams.get("topicId");
  const level = parseInt(searchParams.get("level") || "1");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null); // letra 'a' | 'b' | ...
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<
    { questionId: string; selectedLetter: string; selectedText: string; correctText: string }[]
  >([]);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0); // em segundos

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [examSessionId, setExamSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (topicId) {
      createSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  // Temporizador para a questão atual
  useEffect(() => {
    if (finished) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    setTimeLeft(TIME_PER_QUESTION);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          handleNext(true);
          return TIME_PER_QUESTION; // reinicia para próxima questão
        }
        return time - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, finished]);

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
      fetchQuestions();
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
    selectedOptionLetter: string, // 'a' | 'b' | 'c' | 'd'
    isCorrect: boolean
  ) => {
    if (!examSessionId) return;

    const { error } = await supabase.from("exam_answers").insert([
      {
        exam_session_id: examSessionId,
        question_id: questionId,
        selected_option: selectedOptionLetter,
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
      .update({
        finished_at: new Date().toISOString(),
        score: finalScore,
      })
      .eq("id", examSessionId);

    if (error) {
      console.error("Error finishing exam session:", error);
    }
  };

  // handleNext com argumento para indicar se foi auto (tempo esgotado)
  const handleNext = async (autoAdvance = false) => {
    // Se não selecionou e não é avanço automático, bloqueia
    if (!selected && !autoAdvance) return;

    const currentQuestion = questions[current];
    const correctText = currentQuestion.correct_option;

    // Texto da opção selecionada (ou vazio se autoAdvance sem resposta)
    const selectedOptionText = selected
      ? (currentQuestion[`option_${selected}` as keyof Question] as string)
      : "";

    // Verifica se o texto selecionado é igual ao texto correto
    const isCorrect = selectedOptionText === correctText;

    if (isCorrect) setScore((prev) => prev + 1);

    // Salva no estado respostas a letra da opção, o texto da resposta selecionada e o texto correto
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, selectedLetter: selected || "", selectedText: selectedOptionText, correctText },
    ]);

    // Salva no banco usando a letra da opção (conforme o schema)
    if (selected) {
      await saveAnswer(currentQuestion.id, selected, isCorrect);
    }

    // Calcula tempo gasto na questão: tempo total - tempo restante
    setTotalTimeSpent((prev) => prev + (TIME_PER_QUESTION - timeLeft));

    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
      await finishSession(score + (isCorrect ? 1 : 0));
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setTotalTimeSpent(0);
    createSession();
  };

  const handleGoBack = () => {
    navigate("/dashboard/mock-exams");
  };

  if (!topicId) return <p className="p-4">Missing topicId</p>;

  const question = questions[current];

  // Função para formatar tempo em mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Mock Exam</h1>

        {/* Não mostra botão back durante o exame */}
        {finished && (
          <div className="mb-4">
            <Button onClick={handleGoBack} variant="outline">
              &larr; Back
            </Button>
          </div>
        )}

        {!finished && (
          <div className="mb-2 text-right font-mono text-lg">
            Time Left: {formatTime(timeLeft)}
          </div>
        )}

        {finished ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Your Score: {score} / {questions.length}
            </h2>
            <p className="mb-4 font-mono">
              Total time spent: {formatTime(totalTimeSpent)}
            </p>
            <ul className="space-y-4">
              {questions.map((q, idx) => (
                <li key={q.id} className="border p-3 rounded">
                  <p className="font-semibold mb-1">
                    Q{idx + 1}: {q.question_text}
                  </p>
                  <p className="mb-1">
                    <strong>Your answer:</strong> {answers[idx]?.selectedText}{" "}
                    {answers[idx]?.selectedText === answers[idx]?.correctText
                      ? " ✅"
                      : " ❌"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <Button onClick={restart}>Try Again</Button>
            </div>
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
            <Button onClick={() => handleNext()} disabled={!selected}>
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
