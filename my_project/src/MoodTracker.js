import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./styles/MoodTracker.css"

const getMoodDescription = (score) => {
  switch (score) {
    case 1: return "Very Sad 😢";
    case 2: return "Sad 😞";
    case 3: return "Neutral 😐";
    case 4: return "Happy 😊";
    case 5: return "Very Happy 😃";
    default: return "Neutral 😐";
  }
};

const MoodTracker = () => {
  // Load initial mood history from localStorage
  const [moodHistory, setMoodHistory] = useState(() => {
    const savedHistory = localStorage.getItem("moodHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [moodScore, setMoodScore] = useState(3);
  const [journalEntry, setJournalEntry] = useState("");

  // Save mood history to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
  }, [moodHistory]);

  const handleSaveMood = () => {
    const newMood = {
      date: new Date().toLocaleDateString(),
      score: moodScore,
      description: getMoodDescription(moodScore),
      entry: journalEntry,
    };
    const updatedHistory = [...moodHistory, newMood];
    setMoodHistory(updatedHistory);
    setJournalEntry(""); // Clear input field
  };

  const handleDeleteHistory = () => {
    setMoodHistory([]); // Clear state
    localStorage.removeItem("moodHistory"); // Remove from localStorage
  };

  return (
    <div className="mood-tracker">
      <h2>Rate Your Mood</h2>
      <input
        type="range"
        min="1"
        max="5"
        value={moodScore}
        onChange={(e) => setMoodScore(parseInt(e.target.value))}
      />
      <p>Mood Description: {getMoodDescription(moodScore)}</p>
      <textarea
        placeholder="Journal Entry"
        value={journalEntry}
        onChange={(e) => setJournalEntry(e.target.value)}
      />
      <div className="button-group">
        <button onClick={handleSaveMood}>Save Mood</button>
        <button onClick={handleDeleteHistory} className="delete-btn">Delete History</button>
      </div>

      {moodHistory.length > 0 && (
        <>
          <h3>Weekly Mood Report</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodHistory}>
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Legend verticalAlign="top" align="center" />
              <Line type="monotone" dataKey="score" stroke="blue" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>

          <h3>Previous Mood Reports</h3>
          {moodHistory.map((mood, index) => (
            <div key={index} className="mood-history">
              <p><strong>Date:</strong> {mood.date}</p>
              <p><strong>Mood:</strong> {mood.description}</p>
              <p><strong>Entry:</strong> {mood.entry}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MoodTracker;
