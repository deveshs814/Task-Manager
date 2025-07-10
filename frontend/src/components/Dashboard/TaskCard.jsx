const TaskCard = ({ data, onEdit }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onEdit(data._id); // pass task ID to Dashboard
  };

  return (
    <div
      className="bg-white rounded px-4 w-full py-2 hover:shadow transition-all duration-300"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <h1>{data.title}</h1>
        <div
          className={`text-sm ${
            data.priority.toLowerCase() === "low"
              ? "text-green-500 bg-green-100"
              : data.priority.toLowerCase() === "medium"
              ? "text-yellow-600 bg-yellow-100"
              : data.priority.toLowerCase() === "high"
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
