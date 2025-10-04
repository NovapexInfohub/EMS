"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Trash2, Eye, Save, ArrowLeft } from "lucide-react";

export default function SurveyDashboard() {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const createSurvey = () => {
    const newSurvey = {
      id: Date.now(),
      title: `Untitled Survey ${surveys.length + 1}`,
      description: "",
      questions: [],
    };
    setSurveys([...surveys, newSurvey]);
    setSelectedSurvey(newSurvey);
  };

  const deleteSurvey = (id) => {
    setSurveys(surveys.filter((s) => s.id !== id));
    if (selectedSurvey?.id === id) setSelectedSurvey(null);
  };

  const updateSurvey = (field, value) => {
    setSurveys((prev) =>
      prev.map((s) =>
        s.id === selectedSurvey.id ? { ...s, [field]: value } : s
      )
    );
    setSelectedSurvey((prev) => ({ ...prev, [field]: value }));
  };

  const addQuestion = () => {
    const updatedSurvey = {
      ...selectedSurvey,
      questions: [
        ...selectedSurvey.questions,
        {
          id: Date.now(),
          question: "",
          type: "text",
          options: [""],
        },
      ],
    };
    setSelectedSurvey(updatedSurvey);
    setSurveys((prev) =>
      prev.map((s) => (s.id === updatedSurvey.id ? updatedSurvey : s))
    );
  };

  const updateQuestion = (qid, field, value) => {
    const updatedQuestions = selectedSurvey.questions.map((q) =>
      q.id === qid ? { ...q, [field]: value } : q
    );
    setSelectedSurvey({ ...selectedSurvey, questions: updatedQuestions });
    setSurveys((prev) =>
      prev.map((s) =>
        s.id === selectedSurvey.id ? { ...s, questions: updatedQuestions } : s
      )
    );
  };

  const addOption = (qid) => {
    const updatedQuestions = selectedSurvey.questions.map((q) =>
      q.id === qid ? { ...q, options: [...q.options, ""] } : q
    );
    setSelectedSurvey({ ...selectedSurvey, questions: updatedQuestions });
    setSurveys((prev) =>
      prev.map((s) =>
        s.id === selectedSurvey.id ? { ...s, questions: updatedQuestions } : s
      )
    );
  };

  const updateOption = (qid, index, value) => {
    const updatedQuestions = selectedSurvey.questions.map((q) =>
      q.id === qid
        ? {
            ...q,
            options: q.options.map((opt, i) =>
              i === index ? value : opt
            ),
          }
        : q
    );
    setSelectedSurvey({ ...selectedSurvey, questions: updatedQuestions });
    setSurveys((prev) =>
      prev.map((s) =>
        s.id === selectedSurvey.id ? { ...s, questions: updatedQuestions } : s
      )
    );
  };

  const deleteQuestion = (qid) => {
    const updatedSurvey = {
      ...selectedSurvey,
      questions: selectedSurvey.questions.filter((q) => q.id !== qid),
    };
    setSelectedSurvey(updatedSurvey);
    setSurveys((prev) =>
      prev.map((s) => (s.id === updatedSurvey.id ? updatedSurvey : s))
    );
  };

  return (
    <main className="container mx-auto py-10 px-6">
      {!selectedSurvey ? (
        <>
          <motion.h1
            className="text-4xl font-extrabold text-center text-blue-600 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Survey Management Dashboard
          </motion.h1>

          <div className="flex justify-center mb-8">
            <button
              onClick={createSurvey}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
            >
              <PlusCircle size={20} /> Create New Survey
            </button>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence>
              {surveys.map((survey) => (
                <motion.div
                  key={survey.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {survey.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {survey.description || "No description yet."}
                  </p>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSelectedSurvey(survey)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSurvey(survey.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      ) : (
        <>
          {/* Survey Editor Section */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedSurvey(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} /> Back to Dashboard
            </button>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-200"
            >
              {previewMode ? "Edit Mode" : "Preview Survey"}
            </button>
          </div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <input
              type="text"
              placeholder="Survey Title"
              value={selectedSurvey.title}
              onChange={(e) => updateSurvey("title", e.target.value)}
              className="w-full border-b-2 border-gray-300 p-2 text-2xl font-bold mb-3 focus:border-blue-500 outline-none"
            />
            <textarea
              placeholder="Survey Description..."
              value={selectedSurvey.description}
              onChange={(e) => updateSurvey("description", e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              rows={3}
            />
          </motion.div>

          {!previewMode && (
            <button
              onClick={addQuestion}
              className="flex items-center gap-2 mb-6 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              <PlusCircle size={18} /> Add Question
            </button>
          )}

          <AnimatePresence>
            {selectedSurvey.questions.map((q, index) => (
              <motion.div
                key={q.id}
                className="bg-white p-6 rounded-2xl shadow border border-gray-100 mb-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {!previewMode ? (
                  <>
                    <div className="flex justify-between mb-3">
                      <h3 className="font-semibold text-lg">
                        Question {index + 1}
                      </h3>
                      <button
                        onClick={() => deleteQuestion(q.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter question..."
                      value={q.question}
                      onChange={(e) =>
                        updateQuestion(q.id, "question", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400"
                    />
                    <select
                      value={q.type}
                      onChange={(e) =>
                        updateQuestion(q.id, "type", e.target.value)
                      }
                      className="border border-gray-300 rounded-lg p-2 mb-3"
                    >
                      <option value="text">Text</option>
                      <option value="multiple">Multiple Choice</option>
                      <option value="rating">Rating (1-5)</option>
                    </select>

                    {q.type === "multiple" && (
                      <div className="ml-4">
                        {q.options.map((opt, i) => (
                          <input
                            key={i}
                            type="text"
                            placeholder={`Option ${i + 1}`}
                            value={opt}
                            onChange={(e) =>
                              updateOption(q.id, i, e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                          />
                        ))}
                        <button
                          onClick={() => addOption(q.id)}
                          className="text-blue-600 text-sm hover:underline"
                        >
                          + Add Option
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {q.question}
                    </h3>
                    {q.type === "text" && (
                      <input
                        type="text"
                        placeholder="Your answer"
                        className="w-full border rounded-lg p-2"
                      />
                    )}
                    {q.type === "multiple" && (
                      <div className="space-y-2">
                        {q.options.map((opt, i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <input type="radio" name={`q-${q.id}`} />
                            <label>{opt}</label>
                          </div>
                        ))}
                      </div>
                    )}
                    {q.type === "rating" && (
                      <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <span
                            key={num}
                            className="px-3 py-1 border rounded-lg text-gray-600 cursor-pointer hover:bg-yellow-100"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      )}
    </main>
  );
}
