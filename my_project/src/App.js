import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Global CSS

// Lazy Load Components for Performance
const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));
const Registration = lazy(() => import('./Registration'));
const Dashboard = lazy(() => import('./Dashboard'));
const SOS = lazy(() => import('./SOS'));
const Assessment = lazy(() => import('./Assessment'));
const Chatbot = lazy(() => import('./Chatbot'));
const VideoRecommendation = lazy(() => import('./VideoRecommendation'));
const NewsRecommendation = lazy(() => import('./NewsRecommendation'));
const MoodTracker = lazy(() => import('./MoodTracker'));
const TaskManager = lazy(() => import('./TaskManager'));
const NotFound = lazy(() => import('./NotFound'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/videos" element={<VideoRecommendation />} />
          <Route path="/news" element={<NewsRecommendation />} />
          <Route path="/moodtracker" element={<MoodTracker />} />
          <Route path="/taskmanager" element={<TaskManager />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="*" element={<NotFound />} /> {/* 404 Page */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
