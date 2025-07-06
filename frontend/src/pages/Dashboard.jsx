import { useState } from "react";
import Header from "../components/Header";
import AddTask from "../components/Dashboard/AddTask";
import StackTitle from "../components/Dashboard/StackTitle";
import YetToStart from "../components/YetToStart";
import Completed from "../components/completed";
import InProgress from "../components/InProgress";

const Dashboard = () => {
  const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setAddTaskDiv={setAddTaskDiv} />
      </div>
      <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h[89vh] max-h-auto">
        <div className="w-1/3">
           <StackTitle title={"Yet To Start"}/>
           <div className="pt-2">
            <YetToStart/>
           </div>
        </div>
        <div className="w-1/3">
        <StackTitle title={"In Progress"}/>
        <div className="pt-2"> 
            <InProgress/>
        </div>
        </div>
        <div className="w-1/3">
           <StackTitle title={"Completed"}/>
           <div className="pt-2">
              <Completed/>
           </div>
        </div>
      </div>

      <div
        className={`w-full ${AddTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}
      ></div>
      <div
        className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}
      >
        <AddTask setAddTaskDiv={setAddTaskDiv} />
      </div>
    </div>
  );
};

export default Dashboard;
