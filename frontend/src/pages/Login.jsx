import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-3xl font-bold text-center mb-1 text-blue-500">
          Task-Manager
        </h1>
        <h3 className="text-center font-semibold text-zinc-900">
          Login with Taskify
        </h3>
      </div>
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
        <form className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="email"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            name="email"
          />
          <input
            type="password"
            required
            placeholder="password"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            name="password"
          />
          <button className="bg-blue-800 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300">
            Submit
          </button>
          <p className="text-center font-semibold text-gray-900">
            Don't have an account?
            <Link to={"/register"}>Register Yourself</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
