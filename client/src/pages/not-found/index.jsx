import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "user") {
      navigate("/shop/home");
    } else {
      navigate("/auth/login"); // fallback for unauthenticated users
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-100 to-pink-200 text-center px-4">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4 animate-bounce">
        404
      </h1>
      <p className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </p>
      <p className="text-md text-gray-600 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={handleRedirect}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md transition duration-300"
      >
        {user?.role === "admin"
          ? "Go to Admin Dashboard"
          : user?.role === "user"
          ? "Go to Shop Home"
          : "Login to Continue"}
      </button>
    </div>
  );
}

export default NotFound;
