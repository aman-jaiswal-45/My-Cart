import { LockIcon, ShieldAlertIcon } from "lucide-react";
import { Link } from "react-router-dom";

function UnauthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <ShieldAlertIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-700 mb-6">
          Oops! You don't have permission to view this page. It looks like you're
          trying to access a restricted area.
        </p>
        <Link
          to="/shop/home"
          className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          <LockIcon className="w-4 h-4 mr-2" />
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default UnauthPage;
