import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../api/Auth";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const HandleRegister = async(e) => {
        e.preventDefault();
        
        if(password !== confirmPassword){
            setError("Passwords do not match!")
            return;
        }
        setIsLoading(true);

        try{
          const response = await RegisterUser(username, password);
          console.log(response);
          navigate("/login");
        }
        catch(error){
            setError("Registration failed! Try again.");
        } finally {
          setIsLoading(false); 
      }
    }


    return(
      <div className="min-h-screen bg-custom-bg bg-cover bg-center flex items-center justify-center">
        <div className="bg-white/40 p-8 shadow-lg rounded-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          {error && <p className="text-purple-900 mb-4">{error}</p>}
          <form onSubmit={HandleRegister} className="space-y-4">
            <div>
              <label className="block text">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/login"
              className="text-black hover:text-gray-700"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
}

export default Register;

