import { Clock, CheckCircle, Circle, AlertCircle, Trash2 } from "lucide-react";

export default function TaskCard({ task, onStatusChange, onDeleteTask, isAdmin }) {
  const getStatusIcon = () => {
    switch(task.status) {
      case "completed": return <CheckCircle size={16} color="var(--success)" />;
      case "in-progress": return <Clock size={16} color="var(--primary)" />;
      default: return <Circle size={16} color="var(--warning)" />;
    }
  };

  const getStatusBadgeClass = () => {
    switch(task.status) {
      case "completed": return "badge-completed";
      case "in-progress": return "badge-in-progress";
      default: return "badge-pending";
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed";

  return (
    <div className="glass-card flex flex-col justify-between" style={{ position: "relative" }}>
      {isAdmin && onDeleteTask && (
        <button 
          onClick={() => onDeleteTask(task._id)}
          style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", padding: "0.25rem", borderRadius: "0.25rem", color: "var(--danger)" }}
          title="Delete Task"
        >
          <Trash2 size={16} />
        </button>
      )}
      <div>
        <div className="flex justify-between items-start mb-2 gap-4" style={{ paddingRight: isAdmin && onDeleteTask ? "2rem" : "0" }}>
          <h3 style={{ fontSize: "1.125rem", margin: 0 }}>{task.title}</h3>
          <span className={`badge ${getStatusBadgeClass()} flex items-center gap-2`} style={{ whiteSpace: "nowrap" }}>
            {getStatusIcon()} <span style={{ textTransform: "capitalize" }}>{task.status.replace("-", " ")}</span>
          </span>
        </div>
        {task.description && <p className="text-muted text-sm mb-4">{task.description}</p>}
        
        <div className="text-sm mb-2 text-muted flex items-center gap-2">
          <strong>Project:</strong> {task.project?.name || "Unknown"}
        </div>
        <div className="text-sm mb-4 text-muted flex items-center gap-2">
          <strong>Assignee:</strong> {task.assignedTo?.name || "Unassigned"}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4" style={{ paddingTop: "1rem", borderTop: "1px solid var(--card-border)" }}>
        <div className={`text-sm flex items-center gap-2 ${isOverdue ? 'text-danger' : 'text-muted'}`}>
          <Clock size={14} />
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
          {isOverdue && <AlertCircle size={14} />}
        </div>
        
        <div className="flex gap-2">
          {task.status === "pending" && (
            <button 
              className="btn btn-primary" 
              style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
              onClick={() => onStatusChange(task._id, "in-progress")}
            >
              Start Progress
            </button>
          )}
          
          {task.status === "in-progress" && (
            <button 
              className="btn" 
              style={{ background: "var(--success)", color: "white", padding: "0.25rem 0.5rem", fontSize: "0.75rem", border: "none" }}
              onClick={() => {
                if(window.confirm("Are you sure you want to mark this task as completed?")) {
                  onStatusChange(task._id, "completed");
                }
              }}
            >
              Complete Task
            </button>
          )}

          {task.status === "completed" && (
            <span className="text-success text-sm font-bold flex items-center gap-1">
              <CheckCircle size={14} /> Done
            </span>
          )}
        </div>
      </div>
    </div>
  );
}