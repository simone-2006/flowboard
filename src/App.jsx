import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppProvider } from './context/appContext';
import Navbar from './components/layout/Navbar';

import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Tasks from "./pages/Tasks"
import Team from "./pages/Team"
import Settings from "./pages/Settings"


export default function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}