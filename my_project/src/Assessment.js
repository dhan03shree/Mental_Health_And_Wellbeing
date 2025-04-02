import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./styles/Assessment.css";

const Assessment = () => {
    const [step, setStep] = useState(1);
    const [responses, setResponses] = useState({});
    const [score, setScore] = useState(null);
    const [history, setHistory] = useState([]);
    const [evaluation, setEvaluation] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const username = localStorage.getItem("email"); // ✅ Auto-fetch username

    const questions = [
        "Do you have any suicidal thoughts?",
        "Would you like to end your life?",
        "Do you have a plan for harming yourself?",
        "Do you often feel hopeless or empty?",
        "Do you struggle to find pleasure in activities you once enjoyed?",
        "Do you have difficulty concentrating or making decisions?",
        "Do you feel constantly tired or have low energy?",
        "Have you been experiencing changes in appetite or weight?",
        "Do you feel anxious or restless frequently?",
        "Do you have trouble sleeping or sleep too much?"
    ];

    // ✅ Fetch history only if user is logged in
    const fetchHistory = useCallback(async () => {
        if (!username) return;
        try {
            const res = await axios.get(`http://localhost:8080/api/assessments/history?username=${username}`);
            setHistory(res.data);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    }, [username]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const handleChange = (index, value) => {
        setResponses({ ...responses, [index]: value });
    };

    const calculateScore = () => {
        return Object.values(responses).reduce((sum, value) => sum + value, 0);
    };

    const getEvaluation = (score) => {
        if (score > 40) return "Severe Depression";
        if (score > 20) return "Moderate Depression";
        return "Mild Depression";
    };

    const getRecommendation = (score) => {
        if (score > 40) return "It's recommended to seek immediate professional help.";
        if (score > 20) return "Consider talking to a therapist or engaging in self-care activities.";
        return "You're doing well! Keep maintaining a positive mindset.";
    };

    const handleSubmit = async () => {
        if (!username) {
            alert("User is not logged in. Please log in first.");
            return;
        }

        const totalScore = calculateScore();
        const evalMessage = getEvaluation(totalScore);
        setScore(totalScore);
        setEvaluation(evalMessage);
        setRecommendation(getRecommendation(totalScore));

        const assessmentData = { username, responses, totalScore, evaluation: evalMessage };

        try {
            const response = await fetch("http://localhost:8080/api/assessments/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(assessmentData),
            });

            if (!response.ok) throw new Error("Submission failed");

            alert("Assessment submitted successfully!");
            setStep(4); // Move to results step
            fetchHistory(); // Refresh history after submission
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit assessment. Please try again.");
        }
    };

    return (
        <div className="assessment-container">
            {step === 1 && (
                <div className="card">
                    <h2>Mental Health Assessment</h2>
                    <p>Take a short questionnaire to evaluate your well-being.</p>
                    <button className="primary-btn" onClick={() => setStep(2)}>Start Assessment</button>
                </div>
            )}

            {step === 2 && (
                <div className="card">
                    <h2>Your Data is Secure</h2>
                    <p>Your responses remain confidential.</p>
                    <button className="primary-btn" onClick={() => setStep(3)}>Proceed</button>
                </div>
            )}

            {step === 3 && (
                <div className="card">
                    <h2>Questionnaire</h2>
                    <p className="progress-text">Progress: {Object.keys(responses).length} / {questions.length}</p>
                    <div className="progress-bar">
                        <div style={{ width: `${(Object.keys(responses).length / questions.length) * 100}%` }}></div>
                    </div>
                    {questions.map((question, index) => (
                        <div key={index} className="question">
                            <p>{question}</p>
                            <div className="options">
                                {[0, 1, 2, 3, 4].map((value) => (
                                    <button
                                        key={value}
                                        className={`option-btn ${responses[index] === value ? "selected" : ""}`}
                                        onClick={() => handleChange(index, value)}
                                    >
                                        {value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                </div>
            )}

            {step === 4 && score !== null && (
                <div className="card">
                    <h2>Test Results</h2>
                    <p className="score">Your score: <span className="score-value">{score}</span></p>
                    <p className={`result ${score > 40 ? "severe" : score > 20 ? "moderate" : "mild"}`}>
                        {evaluation}
                    </p>
                    <p>{recommendation}</p>
                    <button className="secondary-btn" onClick={() => setStep(5)}>View History</button>
                </div>
            )}

            {step === 5 && (
                <div className="card">
                    <h2>Test History</h2>
                    {history.length === 0 ? <p>No previous tests found.</p> : (
                        history.map((entry, index) => (
                            <div key={index} className="history-entry">
                                <p>Date: {new Date(entry.timestamp).toLocaleDateString()}</p>
                                <p>Score: {entry.totalScore}</p>
                                <p className={`result ${entry.totalScore > 40 ? "severe" : entry.totalScore > 20 ? "moderate" : "mild"}`}>
                                    {entry.evaluation}
                                </p>
                            </div>
                        ))
                    )}
                    <button className="primary-btn" onClick={() => setStep(1)}>Take New Test</button>
                </div>
            )}
        </div>
    );
};

export default Assessment;
