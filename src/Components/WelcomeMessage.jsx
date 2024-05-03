import React, { useState, useEffect } from "react";
import { fetchUserData } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

function WelcomeMessage() {
  const [showDetails, setShowDetails] = useState(false);
  const userData = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData(token));
  }, []);

  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-8">
      {userData && (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome, {userData?.name}!</h1>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          {showDetails && (
            <div className="rounded-lg p-6 mt-4 border border-gray-300 bg-white">
              <div className="flex justify-start">
                <div className="w-full">
                  <h2 className="text-xl font-bold mb-2">User Details</h2>
                  <p>
                    <strong>Name:</strong> {userData?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData?.email}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WelcomeMessage;
