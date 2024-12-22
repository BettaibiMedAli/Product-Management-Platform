import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../api/Auth";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const HandleRegister = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError("Passwords do not match!")
            return;
        }

        try{
          const response = await RegisterUser(username, password);
          console.log(response);
          navigate("/login");
        }
        catch(error){
            setError("Registration failed! Try again.");
        }
    }


    const gotToLogin = () => {
      navigate("/login");
    };



    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={HandleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
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
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={gotToLogin}
            className="text-blue-500 hover:text-blue-600"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
    );
}

export default Register;

