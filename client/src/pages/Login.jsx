import { useState } from "react";
import API from "../Api";
import { LogIn, UserPlus } from "lucide-react";

export default function Login({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "member" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const res = await API.post(endpoint, formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div className="login-container" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", gap: "4rem", flexWrap: "wrap", padding: "2rem" }}>
      {/* Left Side: Login Form */}
      <div className="glass-card" style={{ width: "100%", maxWidth: "400px", flex: "1 1 350px" }}>
        <div className="text-center mb-6">
          <h2 className="flex items-center justify-center gap-2">
            {isLogin ? <LogIn size={24} /> : <UserPlus size={24} />}
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-muted text-sm">
            {isLogin ? "Enter your credentials to access your account" : "Sign up to start managing your tasks"}
          </p>
        </div>

        {error && <div className="badge badge-pending mb-6 text-center" style={{ display: 'block', padding: '0.5rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Role</label>
              <select 
                className="form-select"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-muted">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            className="btn btn-outline" 
            style={{ padding: "0.25rem 0.5rem", marginLeft: "0.5rem" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>

      {/* Right Side: Demo Information */}
      <div style={{ flex: "1 1 350px", maxWidth: "500px", color: "var(--text)" }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "2rem", letterSpacing: "2px", fontWeight: "300" }}>TASK MANAGER</h1>
        <p style={{ marginBottom: "2rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
          Welcome to the Team Task Manager. This is a full-stack project management application with role-based access control.
          You can create a new account or use the quick login buttons below to explore the demo.
        </p>
        
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button 
            type="button" 
            className="btn btn-outline"
            style={{ flex: 1, minWidth: "150px" }}
            onClick={() => {
              setIsLogin(true);
              setFormData({ ...formData, email: "bhipendarkumar31@gmail.com", password: "haru0314" });
            }}
          >
            Demo Admin
          </button>
          
          <button 
            type="button" 
            className="btn btn-outline"
            style={{ flex: 1, minWidth: "150px" }}
            onClick={() => {
              setIsLogin(true);
              setFormData({ ...formData, email: "rahul@gmail.com", password: "haru0314" });
            }}
          >
            Demo Employee
          </button>
        </div>
      </div>
    </div>
  );
}