import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserSelector } from "../redux/selectors/authSelector";
import { getUserInfoAction, logoutAction } from "../redux/actions/authActions";

function Header() {
  const user = useSelector(getUserSelector);
  const isLogined = !!user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginOnClick = () => {
    navigate("/login");
  };

  const registerOnClick = () => {
    navigate("/register");
  };

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
    navigate("/");
  };

  useEffect(() => {
    if (isLogined) {
      dispatch(getUserInfoAction());
    }
  }, [dispatch, isLogined]);

  return (
    <div className="container mx-auto px-4">
      <header className="flex flex-wrap items-center justify-between py-3 border-b mb-4">
        {/* Logo */}
        <Link to="/" className="flex items-center mb-2 md:mb-0">
          <img
            src="https://via.placeholder.com/120x40?text=Logo"
            alt="logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Navigation */}
        <ul className="flex flex-wrap items-center justify-center space-x-4 md:space-x-6 mb-2 md:mb-0">
          <li>
            <Link to="/" className="font-bold text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cineplexs" className="font-bold text-gray-700 hover:text-blue-600">
              Cinemas
            </Link>
          </li>
          <li className="relative group">
            <span className="font-bold text-gray-700 hover:text-blue-600 cursor-pointer">
              Movies ▼
            </span>
            <ul className="absolute hidden group-hover:block bg-white shadow-md mt-1 py-2 w-44">
              <li>
                <Link
                  to="/movies/now-showing"
                  className="block px-4 py-1 hover:bg-gray-100"
                >
                  Now Showing
                </Link>
              </li>
              <li>
                <Link
                  to="/movies/coming-soon"
                  className="block px-4 py-1 hover:bg-gray-100"
                >
                  Coming Soon
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/showtimes" className="font-bold text-gray-700 hover:text-blue-600">
              Showtimes
            </Link>
          </li>
        </ul>

        {/* Auth Buttons / Profile */}
        <div className="flex items-center space-x-2">
          {!user ? (
            <>
              <button
                onClick={loginOnClick}
                className="px-4 py-1 border rounded hover:bg-gray-200"
              >
                Login
              </button>
              <button
                onClick={registerOnClick}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Register
              </button>
            </>
          ) : (
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-1 border rounded">
                <img
                  src={user.avatar || "https://via.placeholder.com/36"}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span>{user.fullname}</span>
              </button>
              <ul className="absolute hidden group-hover:block bg-white shadow-md mt-1 py-2 w-48 right-0">
                <li>
                  <Link className="block px-4 py-1 hover:bg-gray-100" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="block px-4 py-1 hover:bg-gray-100" to="/history">
                    Booking History
                  </Link>
                </li>
                <li>
                  <Link className="block px-4 py-1 hover:bg-gray-100" to="/change-password">
                    Change Password
                  </Link>
                </li>
                <li>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-1 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
