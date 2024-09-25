// Popup.tsx
import { Link, useNavigate } from "react-router-dom";

const Popup = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-16 right-40 bg-white border border-gray-300 rounded shadow-lg p-4">
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            to="/dashboard/editprofile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/yourevents"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            Your Events
          </Link>
        </li>
        <li>
          <Link
            to="/createevent"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            Create Event
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="block text-left w-full px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
          >
            Sign Out
          </button>
        </li>
      </ul>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
      >
        X
      </button>
    </div>
  );
};

export default Popup;
