import { useState, useEffect } from "react";
import axios from "axios";

const EditTask = ({ setEditTaskDiv, EditTaskId }) => {
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

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/getTask/${EditTaskId}`,
          { withCredentials: true }
        );

        if (res.data?.taskDetails) {
          setValues(res.data.taskDetails);
        } else {
          alert("Invalid task or data missing.");
          setEditTaskDiv();
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        alert("Error loading task.");
        setEditTaskDiv();
      }
    };
    if (EditTaskId) fetch();
  }, [EditTaskId]);

  const editTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/editTask/${Values._id}`,
        Values,
        { withCredentials: true }
      );
      alert(res.data.success);
      setEditTaskDiv();
    } catch (error) {
      alert(error.response?.data?.error || "Error editing task");
    }
  };
const deleteTask = async (e) => {
  e.preventDefault();

  if (!Values?._id) {
    alert("❌ Task ID missing. Cannot delete.");
    return;
  }

  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/v1/deleteTask/${Values._id}`,
      { withCredentials: true }
    );
    console.log("✅ Delete response:", res.data);
    alert(res.data.success);
    setEditTaskDiv();
  } catch (error) {
    console.error("❌ Delete error:", error);
    alert(error.response?.data?.error || "Error deleting task");
  }
};



  return (
    <div className="bg-white rounded px-4 py-4 w-[40%]">
      <h1 className="text-center font-semibold text-xl">Edit Task</h1>
      <hr className="mb-4 mt-2" />
      <form className="flex flex-col gap-4">
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
              <option value="medium">Medium</option>
              <option value="high">High</option>
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
            className="w-full bg-blue-800 hover:bg-blue-700 text-white transition-all duration-300 rounded"
            onClick={(e) => editTask(e, EditTaskId)}
          >
            Edit Task
          </button>
          <button
            className="w-full border border-red-600 text-red-600 hover:bg-red-300 transition-all duration-300 rounded"
            onClick={(e) => deleteTask(e, EditTaskId)}
          >
            Delete Task
          </button>
          <button
            className="w-full border border-black hover:bg-zinc-100 transition-all duration-300 rounded"
            onClick={(e) => {
              e.preventDefault();
              setEditTaskDiv();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
