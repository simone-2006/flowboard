import Button from "../components/ui/Button";
import Input from "../components/ui/Input"

import DashboardCard from "../components/dashboard/components/ui/DashboardCard";
import TaskCompletionProgressBar from "../components/ui/TaskCompletionProgressBar";

import Page from "../components/layout/Page";

import { useAppContext } from '../context/appContext';

export default function Dashboard() {
  const { projects } = useAppContext()
  const totalProjects = projects.length

  const totalTasks = projects.reduce((acc, project) => {
    return acc + project.tasks.length;
  }, 0);

  // const name = "Simone" //usato per adesso in produzione. Piu avanti anche autenticazione.
  const totalTasksToDo = projects.reduce((acc, project) => {
    return acc + project.tasks.filter(task => !task.completed).length;
  }, 0);

  const totalTasksCompleted = projects.reduce((acc, project) => {
    return acc + project.tasks.filter(task => task.completed).length;
  }, 0);

  // prendi il numero di tutte le task con data di scadenza scaduta
  const currentDate = new Date();
  const totalOverdueTasks = projects.reduce((acc, project) => {
    return (
      acc +
      project.tasks.filter(task => {
        if (!task.dueDate) return false;
        // Only compare date parts
        return new Date(task.dueDate) < currentDate && !task.completed;
      }).length
    );
  }, 0);

  {/* (100 * TC) / TT */ }
  const tasksPercentage = (100 * totalTasksCompleted / totalTasksToDo).toFixed(0)

  return (
    <>
      <Page>
        <h3 className="font-bold text-2xl my-2 flex items-center justify-between">Dashboard</h3>
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

        <TaskCompletionProgressBar percentage={tasksPercentage}></TaskCompletionProgressBar>

      </Page>
    </>
  );
}