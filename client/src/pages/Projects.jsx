import { useState, useEffect } from "react";
import API from "../Api";
import TaskCard from "../components/TaskCard";
import { FolderKanban, Plus, X, Users, ChevronDown, ChevronUp } from "lucide-react";

export default function Projects({ user }) {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const [projectTasks, setProjectTasks] = useState([]);
  
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", members: [] });
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "", dueDate: "" });

  useEffect(() => {
    fetchProjects();
    if (user.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjectTasks = async (projectId) => {
    try {
      const res = await API.get(`/tasks/project/${projectId}`);
      setProjectTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProjectClick = (projectId) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
      fetchProjectTasks(projectId);
      setShowTaskForm(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await API.post("/projects", newProject);
      setShowProjectForm(false);
      setNewProject({ name: "", description: "", members: [] });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", { ...newTask, project: expandedProject });
      setShowTaskForm(false);
      setNewTask({ title: "", description: "", assignedTo: "", dueDate: "" });
      fetchProjectTasks(expandedProject);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTaskStatusChange = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });
      fetchProjectTasks(expandedProject);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/tasks/${taskId}`);
      fetchProjectTasks(expandedProject);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMemberSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setNewProject({ ...newProject, members: selectedOptions });
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2">
          <FolderKanban /> Projects
        </h2>
        {user.role === "admin" && (
          <button className="btn btn-primary" onClick={() => setShowProjectForm(!showProjectForm)}>
            {showProjectForm ? <X size={18} /> : <Plus size={18} />}
            <span style={{ marginLeft: "0.5rem" }}>{showProjectForm ? "Cancel" : "New Project"}</span>
          </button>
        )}
      </div>

      {showProjectForm && user.role === "admin" && (
        <div className="glass-card mb-6 animate-fade-in">
          <h3 className="mb-4">Create New Project</h3>
          <form onSubmit={handleCreateProject}>
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input type="text" className="form-input" required value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <input type="text" className="form-input" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Assign Members</label>
              <select multiple className="form-select" style={{ height: "100px" }} value={newProject.members} onChange={handleMemberSelection}>
                {users.map(u => (
                  <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                ))}
              </select>
              <small className="text-muted mt-1" style={{ display: "block" }}>Hold Ctrl/Cmd to select multiple members.</small>
            </div>
            <button type="submit" className="btn btn-primary">Create Project</button>
          </form>
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: "1fr", gap: "1rem" }}>
        {projects.length === 0 ? (
          <div className="glass-card text-center text-muted">No projects found.</div>
        ) : projects.map(project => (
          <div key={project._id} className="glass-card">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => handleProjectClick(project._id)}>
              <div>
                <h3 style={{ margin: 0 }}>{project.name}</h3>
                {project.description && <p className="text-muted text-sm mt-1">{project.description}</p>}
                <div className="flex items-center gap-2 mt-2 text-sm text-muted">
                  <Users size={14} /> {project.members.length} Members
                </div>
              </div>
              <div>
                {expandedProject === project._id ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            {expandedProject === project._id && (
              <div className="mt-4 pt-4 animate-fade-in" style={{ borderTop: "1px solid var(--card-border)" }}>
                <div className="flex justify-between items-center mb-4">
                  <h4>Project Tasks</h4>
                  {user.role === "admin" && (
                    <button className="btn btn-outline" style={{ padding: "0.25rem 0.5rem", fontSize: "0.875rem" }} onClick={() => setShowTaskForm(!showTaskForm)}>
                      {showTaskForm ? "Cancel" : "+ Add Task"}
                    </button>
                  )}
                </div>

                {showTaskForm && user.role === "admin" && (
                  <form onSubmit={handleCreateTask} className="mb-6 p-4 rounded" style={{ background: "rgba(0,0,0,0.2)" }}>
                    <div className="form-group">
                      <label className="form-label">Task Title</label>
                      <input type="text" className="form-input" required value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <input type="text" className="form-input" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} />
                    </div>
                    <div className="flex gap-4">
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Assign To</label>
                        <select className="form-select" required value={newTask.assignedTo} onChange={e => setNewTask({...newTask, assignedTo: e.target.value})}>
                          <option value="">Select Member</option>
                          {project.members.map(m => (
                            <option key={m._id} value={m._id}>{m.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Due Date</label>
                        <input type="date" className="form-input" required min={new Date().toISOString().split("T")[0]} value={newTask.dueDate} onChange={e => setNewTask({...newTask, dueDate: e.target.value})} />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: "0.5rem 1rem" }}>Save Task</button>
                  </form>
                )}

                {projectTasks.length === 0 ? (
                  <div className="text-muted text-sm italic">No tasks in this project yet.</div>
                ) : (
                  <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                    {projectTasks.map(task => (
                      <TaskCard key={task._id} task={task} onStatusChange={handleTaskStatusChange} onDeleteTask={handleDeleteTask} isAdmin={user.role === "admin"} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}