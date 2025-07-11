import { MdLogout } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = ({ setAddTaskDiv }) => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/v1/logout`,
  {},
  { withCredentials: true }
);

      alert(res.data.message);
      localStorage.clear("userLoggedIn");
      navigate("/login");
    } catch (error) {}
  };
  return (
    <div className="flex px-12 py-4 items-center justify-between border-b-4">
      <div>
        <h1 className="text-2xl text-blue-800 font-semibold">Taskify</h1>
      </div>
      <div className="flex gap-8">
        <button
          className="hover:text-blue-800 transition-all duration-300"
          onClick={() => setAddTaskDiv("block")}
        >
          Add Task
        </button>
        <button
          className="text-2xl hover:text-red-600 transition-all duration-300"
          onClick={logout}
        >
          <MdLogout />
        </button>
      </div>
    </div>
  );
};

export default Header;
