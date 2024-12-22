import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../api/Auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await LoginUser(username, password);
      const { access_token } = response.data;

      localStorage.setItem("token", access_token);
      navigate("/");
      console.log("Navigating to Dashboard");
    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-custom-bg bg-cover bg-center flex items-center justify-center">
      <div className="bg-white/40 backdrop-blur-md p-8 shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-purple-900 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-black">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={goToRegister}
            className="text-black hover:text-gray-700"
          >
            Don't have an account? Register here.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
