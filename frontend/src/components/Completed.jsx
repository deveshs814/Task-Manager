import TaskCard from "./Dashboard/TaskCard";

const Completed = ({task}) => {
  return (
    <div className="flex flex-col gap-2">
      {task && task.map((item, i) => <TaskCard key={i} data={item} />)}
    </div>
  )
}

export default Completed
