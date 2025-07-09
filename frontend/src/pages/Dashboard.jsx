import { useEffect, useState } from "react";
import Header from "../components/Header";
import AddTask from "../components/Dashboard/AddTask";
import StackTitle from "../components/Dashboard/StackTitle";
import YetToStart from "../components/YetToStart";
import Completed from "../components/completed";
import InProgress from "../components/InProgress";
import axios from "axios";

const Dashboard = () => {
  const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
  const [EditTaskDiv, setEditTaskDiv] = useState("block");
  const [tasks, setTasks] = useState();

  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/userDetails", {
        withCredentials: true,
      });
      setTasks(res.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setAddTaskDiv={setAddTaskDiv} />
      </div>
      <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh]">
        <div className="w-1/3">
          <StackTitle title={"Yet To Start"} />
          <div className="pt-2">
            {tasks && <YetToStart task={tasks.yetToStart || []} />}
          </div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"In Progress"} />
          <div className="pt-2">
            {tasks && <InProgress task={tasks.inProgress || []} />}
          </div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"Completed"} />
          <div className="pt-2">
            {tasks && <Completed task={tasks.completed || []} />}
          </div>
        </div>
      </div>

      {/* Overlay background */}
      <div
        className={`w-full ${AddTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 `}
      ></div>

      {/* Task form */}
      <div
        className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}
      >
        <AddTask setAddTaskDiv={setAddTaskDiv}  />
      </div>
      <div
        className={`w-full ${EditTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 `}
      ></div>

      {/* Task form */}
      <div
        className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}
      >
        <EditTaskDiv setEditTaskDiv={setEditTaskDiv} />
      </div>
    </div>
  );
};

export default Dashboard;
