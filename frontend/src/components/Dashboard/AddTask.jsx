import { useState } from "react";
import axios from "axios";

const AddTask = ({ setAddTaskDiv }) => {
  const [Values, setValues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "yetToStart",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/addTask`,
        {
          title: Values.title,
          description: Values.description,
          priority: Values.priority,
          status: Values.status,
        },
        { withCredentials: true }
      );

      if (res?.data?.success) {
        alert(res.data.success);
        setAddTaskDiv("hidden");
        window.location.reload();
      } else {
        alert("Something went wrong");
      }

      setValues({
        title: "",
        description: "",
        priority: "low",
        status: "yetToStart",
      });
    } catch (error) {
      console.error("❌ Add Task Error:", error);
      alert(error?.response?.data?.error || "Internal Server Error");
    }
  };

  return (
    <div className="bg-white rounded px-4 py-4 w-[40%]">
      <h1 className="text-center font-semibold text-xl">Add Task</h1>
      <hr className="mb-4 mt-2" />
      <form className="flex flex-col gap-4" onSubmit={addTask}>
        <input
          type="text"
          className="border px-2 py-1 rounded border-zinc-300 outline-none"
          placeholder="Title"
          name="title"
          value={Values.title}
          onChange={change}
        />
        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="mb-2">Select Priority</h3>
            <select
              name="priority"
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              value={Values.priority}
              onChange={change}
            >
              <option value="low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="w-full">
            <h3 className="mb-2">Select Status</h3>
            <select
              name="status"
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              value={Values.status}
              onChange={change}
            >
              <option value="yetToStart">Yet To Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <textarea
          name="description"
          placeholder="Description"
          className="border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"
          value={Values.description}
          onChange={change}
        ></textarea>
        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-700 text-white transition-all duration-300 rounded"
          >
            Add Task
          </button>
          <button
            type="button"
            className="w-full border border-black hover:bg-zinc-100 transition-all duration-300 rounded"
            onClick={() => setAddTaskDiv("hidden")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
