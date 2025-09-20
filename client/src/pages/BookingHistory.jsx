import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"; // <-- v6 change
import { userGetBookingAction } from "../redux/actions/bookingActions";
import { getUserSelector } from "../redux/selectors/authSelector";
import { userGetBookingSelector } from "../redux/selectors/bookingSelector";

function BookingHistory() {
  const user = useSelector(getUserSelector);
  const bookings = useSelector(userGetBookingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userGetBookingAction());
    return () => {
      dispatch({ type: "REMOVE_USER_BOOKINGS" });
    };
  }, [dispatch]);

  // Redirect to login if user is not logged in
  if (!user) return <Navigate to="/login" replace />; // <-- v6 replacement

  return (
    <main className="flex-shrink-0 min-h-screen flex flex-col items-center pt-10 bg-gray-50">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-center text-2xl font-semibold mb-4">Booking History</h3>
        <hr />

        {bookings.length === 0 ? (
          <p className="text-center mt-4 text-gray-700">No bookings found.</p>
        ) : (
          bookings.map((booking, i) => {
            const barcodeUrl = `https://www.barcodesinc.com/generator/image.php?code=${booking.b_number}&style=196&type=C128B&width=180&height=60&xres=1&font=16`;

            return (
              <div key={i} className="mt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Movie Poster */}
                  <div className="flex-shrink-0 md:w-1/4">
                    <img
                      src={booking.Showtime.Movie.poster}
                      alt={booking.Showtime.Movie.title}
                      className="w-full h-64 object-cover rounded"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 space-y-2 text-gray-700">
                    <h5 className="font-bold text-lg">
                      {booking.Showtime.Movie.title} ({booking.Showtime.Cinema.CinemaType.name})
                    </h5>
                    <hr className="my-1" />

                    <p>
                      <strong>Booking ID:</strong> {booking.b_number} |{" "}
                      <strong>Booking Time:</strong>{" "}
                      {moment(booking.createdAt).format("DD/MM/YYYY - HH:mm A")}
                    </p>

                    <p>
                      <strong>Showtime:</strong>{" "}
                      {moment(booking.Showtime.start_time).format("DD/MM/YYYY")} -{" "}
                      {moment(booking.Showtime.start_time).format("HH:mm A")} ~{" "}
                      {moment(booking.Showtime.end_time).format("HH:mm A")}
                    </p>

                    <p>
                      <strong>Cinema:</strong> {booking.Showtime.Cinema.Cineplex.name} |{" "}
                      <strong>Room:</strong> {booking.Showtime.Cinema.name}
                    </p>

                    <p>
                      <strong>Seats:</strong>{" "}
                      {booking.Tickets.map((ticket, index) =>
                        index === 0 ? ticket.seat_code : `, ${ticket.seat_code}`
                      )}{" "}
                      | <strong>Price:</strong> {booking.Tickets.length} x{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(booking.Tickets[0].price)}
                    </p>

                    <p>
                      <strong>Total:</strong>{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(booking.total)}
                    </p>

                    <img
                      src={barcodeUrl}
                      alt="Booking Barcode"
                      className="w-80 h-20 object-contain mt-2"
                    />
                  </div>
                </div>

                <hr className="my-4" />
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}

export default BookingHistory;
