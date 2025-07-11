import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import AddTask from "../components/Dashboard/AddTask";
import StackTitle from "../components/Dashboard/StackTitle";
import YetToStart from "../components/YetToStart";
import InProgress from "../components/InProgress";
import Completed from "../components/completed";
import EditTask from "../components/EditTask";

const Dashboard = () => {
  const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [EditTaskId, setEditTaskId] = useState(null);
  const [tasks, setTasks] = useState();

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/userDetails`, {
  withCredentials: true,
});
      setTasks(res.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [AddTaskDiv, isEditVisible]);

  const handleEditTask = (id) => {
    setEditTaskId(id);
    setIsEditVisible(true);
  };

  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setAddTaskDiv={setAddTaskDiv} />
      </div>

      <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh]">
        <div className="w-1/3">
          <StackTitle title={"Yet To Start"} />
          <div className="pt-2">
            {tasks && <YetToStart task={tasks.yetToStart || []} onEdit={handleEditTask} />}
          </div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"In Progress"} />
          <div className="pt-2">
            {tasks && <InProgress task={tasks.inProgress || []} onEdit={handleEditTask} />}
          </div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"Completed"} />
          <div className="pt-2">
            {tasks && <Completed task={tasks.completed || []} onEdit={handleEditTask} />}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {AddTaskDiv === "block" && (
        <>
          <div className="w-full h-screen fixed top-0 left-0 bg-zinc-800 opacity-70"></div>
          <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center">
            <AddTask setAddTaskDiv={setAddTaskDiv} />
          </div>
        </>
      )}

      {/* Edit Task Modal */}
      {isEditVisible && (
        <>
          <div className="w-full h-screen fixed top-0 left-0 bg-zinc-800 opacity-70"></div>
          <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center">
            <EditTask
              EditTaskId={EditTaskId}
              setEditTaskDiv={() => {
                setIsEditVisible(false);
                setEditTaskId(null);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
