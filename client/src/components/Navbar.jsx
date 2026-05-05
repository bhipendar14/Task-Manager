import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderKanban, LogOut, ShieldAlert } from "lucide-react";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav style={{ background: "rgba(15, 23, 42, 0.8)", borderBottom: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 100 }}>
      <div className="container flex justify-between items-center" style={{ padding: "1rem 2rem" }}>
        <div className="flex items-center gap-2">
          <div style={{ background: "var(--primary)", padding: "0.5rem", borderRadius: "0.5rem" }}>
            <FolderKanban size={24} color="white" />
          </div>
          <h1 style={{ fontSize: "1.25rem", margin: 0 }}>TeamTask</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2" style={{ color: "var(--text-main)" }}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/projects" className="flex items-center gap-2" style={{ color: "var(--text-main)" }}>
            <FolderKanban size={18} /> Projects
          </Link>
          
          <div style={{ width: "1px", height: "24px", background: "var(--card-border)" }}></div>
          
          <div className="flex items-center gap-2">
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.875rem", fontWeight: "600" }}>{user.name}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end", textTransform: "capitalize" }}>
                {user.role === "admin" && <ShieldAlert size={12} color="var(--warning)" />}
                {user.role}
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: "0.5rem" }} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}