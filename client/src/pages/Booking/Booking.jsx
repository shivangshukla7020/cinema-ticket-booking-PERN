import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getShowtimeDetailAction } from "../../redux/actions/showtimeActions";
import { getUserSelector } from "../../redux/selectors/authSelector";
import {
  getResetSeatsSelector,
  getShowtimeDetailSelector,
} from "../../redux/selectors/showtimeSelector";
import Seats from "./Seats";
import { getBookingSelector } from "../../redux/selectors/bookingSelector";

function Booking() {
  const { showtimeId } = useParams();

  const user = useSelector(getUserSelector);
  const showtime = useSelector(getShowtimeDetailSelector);
  const resetSeats = useSelector(getResetSeatsSelector);
  const booking = useSelector(getBookingSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onPreviousButton = () => navigate(-1);

  const onNextButton = () => {
    if (booking.seats.length === 0) {
      return alert("Please select seats!");
    }
    navigate("/payment", { state: { user, showtime, booking } });
  };

  useEffect(() => {
    dispatch(getShowtimeDetailAction(showtimeId, navigate));
    return () => {
      dispatch({ type: "REMOVE_SHOWTIME_DETAIL" });
      dispatch({ type: "REMOVE_BOOKING" });
    };
  }, [dispatch, showtimeId, navigate]);

  if (!user) return <Navigate to="/login" replace />;

  if (!showtime || Object.keys(showtime).length === 0) return null;

  return (
    <main className="flex-shrink-0 min-h-screen flex flex-col items-center bg-gray-50 py-10">
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-center text-2xl font-semibold mb-4">Book Movie Tickets</h3>

        <div className="mb-4">
          <p className="font-bold">
            {showtime.Cinema.Cineplex.name} | {showtime.Cinema.name} | Seats ({resetSeats}/
            {showtime.Cinema.horizontal_size * showtime.Cinema.vertical_size})
          </p>
          <p className="font-bold">
            {moment(showtime.start_time).format("DD/MM/YYYY HH:mm A")} ~{" "}
            {moment(showtime.end_time).format("DD/MM/YYYY HH:mm A")}
          </p>
        </div>

        {/* Seat Selection */}
        <Seats data={showtime} booking={booking} />

        {/* Movie & Booking Details */}
        <div className="flex flex-col md:flex-row mt-6 gap-4 items-center">
          {/* Previous Button */}
          <button
            onClick={onPreviousButton}
            className="flex items-center justify-center w-12 h-12 text-white bg-red-500 rounded-full hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </button>

          {/* Movie Info */}
          <div className="flex-1 flex items-center gap-4">
            <img
              src={showtime.Movie.poster}
              alt={showtime.Movie.title}
              className="w-32 h-40 object-cover rounded"
            />
            <div className="space-y-1">
              <p className="font-bold">{showtime.Movie.title}</p>
              <p className="text-gray-600">{showtime.Movie.genre}</p>
              <p className="text-gray-600">{showtime.Cinema.CinemaType.name}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="flex-1 flex justify-between text-gray-700">
            <div className="space-y-1">
              <p>Cinema</p>
              <p>Showtime</p>
              <p>Room</p>
              {booking.seats.length > 0 && <p>Price</p>}
              {booking.seats.length > 0 && <p>Seats</p>}
            </div>
            <div className="space-y-1 font-bold">
              <p>{showtime.Cinema.Cineplex.name}</p>
              <p>{moment(showtime.start_time).format("DD/MM/YYYY - HH:mm A")}</p>
              <p>{showtime.Cinema.name}</p>
              {booking.seats.length > 0 && (
                <p>
                  {booking.seats.length} x{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(showtime.price)}
                </p>
              )}
              {booking.seats.length > 0 && <p>{booking.seats.join(", ")}</p>}
            </div>
          </div>

          {/* Total Price */}
          <div className="flex flex-col items-end font-bold text-gray-800">
            <p>Total</p>
            <p>
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                booking.total
              )}
            </p>
          </div>

          {/* Next Button */}
          <button
            onClick={onNextButton}
            className="flex items-center justify-center w-12 h-12 text-white bg-green-500 rounded-full hover:bg-green-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Booking;
