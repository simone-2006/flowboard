import Button from "../components/ui/Button";
import Input from "../components/ui/Input"

import DashboardCard from "../components/dashboard/components/ui/DashboardCard";
import TaskCompletionProgressBar from "../components/ui/TaskCompletionProgressBar";
import LastActivityCard from "../components/dashboard/components/ui/LastActivityCard";

import Page from "../components/layout/Page";

import { listProjects } from '../api/projects';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  const totalProjects = projects.length

  const totalTasks = projects.reduce((acc, project) => {
    return acc + (project.tasks ?? []).length;
  }, 0);

  // const name = "Simone" //usato per adesso in produzione. Piu avanti anche autenticazione.
  const totalTasksToDo = projects.reduce((acc, project) => {
    return acc + (project.tasks ?? []).filter(task => !task.completed).length;
  }, 0);

  const totalTasksCompleted = projects.reduce((acc, project) => {
    return acc + (project.tasks ?? []).filter(task => task.completed).length;
  }, 0);

  // prendi il numero di tutte le task con data di scadenza scaduta
  const currentDate = new Date();
  const totalOverdueTasks = projects.reduce((acc, project) => {
    return (
      acc +
      (project.tasks ?? []).filter(task => {
        if (!task.dueDate) return false;
        // Only compare date parts
        return new Date(task.dueDate) < currentDate && !task.completed;
      }).length
    );
  }, 0);

  // (100 * Completed Tasks) / Total Tasks
  const tasksPercentage = totalTasks === 0 ? 0 : ((100 * totalTasksCompleted) / totalTasks).toFixed(0);

  return (
    <>
      <Page>
        {/* UN BANNER WORK IN PROGRESS GIGANTE */}
        {/* <div className="bg-yellow-500 text-white p-4 rounded-lg mb-4">
          <p className="font-bold text-xl">Work in progress</p>
          <p className="text-sm">This project is a work in progress.</p>
        </div> */}
        <h3 className="font-bold text-2xl my-2 flex items-center justify-between">Dashboard</h3>
        {loading && <p className="text-sm text-gray-500 mb-2">Loading...</p>}
        {error && <p className="text-sm text-red-600 mb-2">Could not load projects.</p>}
        <div className="grid grid-cols-3">
          <DashboardCard cardTitle="Total projects">
            <p className="font-bold text-xl text-amber-600">{totalProjects}</p>
          </DashboardCard>
          <DashboardCard cardTitle="Total task to do">
            <p className="font-bold text-xl text-blue-600">{totalTasksToDo}</p>
          </DashboardCard>
          <DashboardCard cardTitle="Total task completed">
            <p className="font-bold text-xl text-green-600">{totalTasksCompleted}</p>
          </DashboardCard>
          <DashboardCard cardTitle="Total task overdue">
            <p className="font-bold text-xl text-red-600">{totalOverdueTasks}</p>
          </DashboardCard>
        </div>
        <LastActivityCard />

        {/* <TaskCompletionProgressBar percentage={tasksPercentage}></TaskCompletionProgressBar> */}

      </Page>
    </>
  );
}
