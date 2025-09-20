import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"; // <-- v6 change
import { getUserSelector } from "../../redux/selectors/authSelector";
import ModalForm from "./components/ModalForm";
import moment from "moment";

function Profile() {
  const user = useSelector(getUserSelector);

  // Redirect to login if user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />; // <-- v6 replacement
  }

  return (
    <main className="flex-shrink-0 min-h-screen flex flex-col items-center pt-10 bg-gray-50">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-center text-2xl font-semibold mb-4">PERSONAL INFORMATION</h3>

        <div className="flex flex-col items-center mb-4">
          <img
            className="w-44 h-44 rounded-full object-cover"
            src={user.avatar}
            alt={user.fullname}
          />
        </div>

        <div className="flex justify-center gap-12 mb-2 text-gray-700">
          <div className="space-y-1">
            <div><span className="font-medium">Full Name:</span> {user.fullname}</div>
            <div><span className="font-medium">Email:</span> {user.email}</div>
          </div>
          <div className="space-y-1">
            <div><span className="font-medium">Birthday:</span> {moment(user.birthday).format("DD/MM/YYYY")}</div>
            <div><span className="font-medium">Phone:</span> {user.phone}</div>
          </div>
        </div>

        <div className="text-center text-gray-700 mb-4">
          <span className="font-medium">Address:</span> {user.address}
        </div>

        <div className="flex justify-center mt-4">
          <ModalForm data={user} isShow={false} />
        </div>
      </div>
    </main>
  );
}

export default Profile;
