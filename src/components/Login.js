import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess(data.token));
        localStorage.setItem("token", data.token); // Persist login
        navigate("/users");
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">Sign In</h2>
        <p className="text-center text-gray-500 mb-6">Access your account</p>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError("")} className="text-red-600 font-bold focus:outline-none">&times;</button>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              className="w-full border p-3 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              className="w-full border p-3 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className={`w-full py-3 rounded text-white font-semibold transition-all ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
