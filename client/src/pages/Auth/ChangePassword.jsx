import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../redux/selectors/authSelector";
import { Redirect, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { changePasswordAction } from "../../redux/actions/authActions";

const ChangePassword = () => {
  const user = useSelector(getUserSelector);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitData = (data) => {
    if (data.new_password !== data.confirm_new_password) {
      toast.error("New password does not match!");
    } else {
      dispatch(changePasswordAction(data, navigate));
    }
  };

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="flex-shrink-0 min-h-screen flex flex-col items-center pt-10 bg-gray-50">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img
            className="w-44 h-44 rounded-full object-cover"
            src={user.avatar}
            alt={user.fullname}
          />
          <h3 className="mt-4 text-2xl font-semibold">{user.fullname}</h3>
        </div>

        <form id="form-edit" onSubmit={handleSubmit(onSubmitData)} className="space-y-4">
          <input type="text" autoComplete="username" hidden />

          <div>
            <label className="block font-medium mb-1">Current Password</label>
            <input
              type="password"
              {...register("current_password")}
              autoComplete="current-password"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">New Password</label>
            <input
              type="password"
              {...register("new_password")}
              autoComplete="new-password"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              {...register("confirm_new_password")}
              autoComplete="confirm-new-password"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            form="form-edit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Change Password
          </button>
        </form>
      </div>
    </main>
  );
};

export default ChangePassword;
