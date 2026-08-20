import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';

import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Tasks from "./pages/Tasks"
import Team from "./pages/Team"
import Settings from "./pages/Settings"
import CreateProject from './pages/CreateProject';
import EditProject from './pages/EditProject';

{/* TEST */ }
{/* TEST */ }

import Alert from './components/ui/Alert';
import { showAlert } from './components/ui/Alert';

export default function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <Router>
        {/* Alert container - fixed to stay visible when scrolling */}
        <div className="fixed right-0 top-0 p-2 z-50" id="alert-container">
        </div>

        {/* TEST */}
        {/* TEST */}

        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/editproject" element={<EditProject />} />
          <Route path="/editproject/:id" element={<EditProject />} />
        </Routes>
      </Router>
      {/* Bottone di test per le alert */}
      {/* <button
        onClick={() => showAlert("Test alert: Confermato!", "success")}
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 50,
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          background: "#f87171",
          color: "white",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Test Alert
      </button> */}
    </div>
  );
}
