const TaskCard = ({ data }) => {
  return (
    <div className="bg-white rounded px-4 w-full py-2 hover:shadow transition-all duration-300">
      <div className="flex items-center justify-between">
        <h1>{data.title}</h1>
        <div
          className={`text-sm ${
            data.priority === "low"
              ? "text-green-500 bg-green-100"
              : data.priority === "medium"
              ? "text-yellow-500 bg-yellow-100"
              : data.priority === "high"
              ? "text-red-500 bg-red-100"
              : ""
          } px-2 rounded-full`}
        >
          <p>{data.priority}</p>
        </div>
      </div>
      <hr className="my-2" />
      <p className="text-sm text-zinc-500 text-start">{data.description}</p>
    </div>
  );
};


export default TaskCard;

