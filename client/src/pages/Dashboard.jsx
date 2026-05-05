import { useState, useEffect } from "react";
import API from "../Api";
import TaskCard from "../components/TaskCard";
import { LayoutDashboard, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function Dashboard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading tasks...</div>;

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed").length
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2">
          <LayoutDashboard /> Dashboard
        </h2>
      </div>

      <div className="grid mb-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <div className="glass-card flex items-center justify-between">
          <div>
            <div className="text-muted text-sm mb-1">Total Tasks</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{stats.total}</div>
          </div>
          <LayoutDashboard size={32} style={{ color: "var(--primary)", opacity: 0.5 }} />
        </div>
        <div className="glass-card flex items-center justify-between">
          <div>
            <div className="text-muted text-sm mb-1">In Progress</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{stats.inProgress}</div>
          </div>
          <Clock size={32} style={{ color: "var(--primary)", opacity: 0.5 }} />
        </div>
        <div className="glass-card flex items-center justify-between">
          <div>
            <div className="text-muted text-sm mb-1">Completed</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{stats.completed}</div>
          </div>
          <CheckCircle size={32} style={{ color: "var(--success)", opacity: 0.5 }} />
        </div>
        <div className="glass-card flex items-center justify-between">
          <div>
            <div className="text-muted text-sm mb-1">Overdue</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: stats.overdue > 0 ? "var(--danger)" : "inherit" }}>
              {stats.overdue}
            </div>
          </div>
          <AlertCircle size={32} style={{ color: "var(--danger)", opacity: 0.5 }} />
        </div>
      </div>

      <h3 className="mb-4">Recent Tasks</h3>
      {tasks.length === 0 ? (
        <div className="glass-card text-center text-muted">No tasks found.</div>
      ) : (
        <div className="grid">
          {tasks.map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onStatusChange={handleStatusChange} 
              onDeleteTask={handleDeleteTask}
              isAdmin={user.role === "admin"}
            />
          ))}
        </div>
      )}
    </div>
  );
}