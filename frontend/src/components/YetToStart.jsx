import TaskCard from './Dashboard/TaskCard';


const YetToStart = ({ task, onEdit }) => {
  return (
    <div className="flex flex-col gap-3">
      {task.map((t) => (
        <TaskCard key={t._id} data={t} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default YetToStart;

