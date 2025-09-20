import moment from "moment";
import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Timer from "./components/Timer";
import { useDispatch } from "react-redux";
import { createBookingAction } from "../../redux/actions/bookingActions";

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [valueRadio, setValueRadio] = useState("atm");

  if (!location.state) {
    return <Navigate to="/movies/now-showing" replace />;
  }

  const { user = {}, showtime = {}, booking = {} } = location.state;

  const onPreviousButtonClick = () => navigate(-1);
  const onPaymentButtonClick = () =>
    dispatch(createBookingAction({ user, showtime, booking }, navigate));
  const onChangeRadioCheckbox = (e) => setValueRadio(e.target.value);

  return (
    <main className="flex-shrink-0 py-6">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-center text-2xl font-bold mb-6">PAYMENT</h3>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          {/* Payment Method */}
          <div className="flex-1">
            <h6 className="font-semibold mb-2">PAYMENT METHOD</h6>

            {[
              {
                id: "atm-card",
                label: "ATM Card (Local)",
                value: "atm",
                img: "https://www.cgv.vn/media/catalog/product/placeholder/default/atm_icon.png",
              },
              {
                id: "visa-card",
                label: "International Card (Visa, Master, Amex, JCB)",
                value: "visa",
                img: "https://www.cgv.vn/media/catalog/product/placeholder/default/visa-mastercard-icon.png",
              },
              {
                id: "momo-wallet",
                label: "MoMo Wallet",
                value: "momo",
                img: "https://www.cgv.vn/media/catalog/product/placeholder/default/momo_icon.png",
              },
              {
                id: "zalo-pay",
                label: "ZaloPay",
                value: "zalo",
                img: "https://www.cgv.vn/media/catalog/product/placeholder/default/zalopay_icon.png",
              },
              {
                id: "viettel-pay",
                label: "ViettelPay",
                value: "viettel",
                img: "https://www.cgv.vn/media/catalog/product/placeholder/default/viettelpay-logo.jpg",
              },
            ].map((method) => (
              <label
                key={method.id}
                htmlFor={method.id}
                className="flex items-center mb-3 cursor-pointer"
              >
                <input
                  type="radio"
                  id={method.id}
                  name="paymentMethod"
                  value={method.value}
                  checked={valueRadio === method.value}
                  onChange={onChangeRadioCheckbox}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <img src={method.img} alt={method.label} className="w-9 h-9 ml-3" />
                <span className="ml-2">{method.label}</span>
              </label>
            ))}
          </div>

          {/* Timer */}
          <div className="w-32 flex justify-center items-center">
            <Timer initialMinute={5} />
          </div>
        </div>

        {/* Booking Summary */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <button onClick={onPreviousButtonClick} className="text-blue-600 hover:text-blue-800">
            Previous
          </button>

          <div className="flex flex-1 items-center space-x-4">
            <img
              src={showtime.Movie.poster}
              alt={showtime.Movie.title}
              className="w-24 h-36 object-cover"
            />
            <div>
              <p className="font-bold">{showtime.Movie.title}</p>
              <p>{showtime.Movie.genre}</p>
              <p>{showtime.Cinema.CinemaType.name}</p>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <p>Cinema: {showtime.Cinema.Cineplex.name}</p>
            <p>Showtime: {moment(showtime.start_time).format("DD/MM/YYYY - HH:mm A")}</p>
            <p>Room: {showtime.Cinema.name}</p>
            {booking.seats.length > 0 && (
              <>
                <p>
                  Price: {booking.seats.length} x{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "VND",
                  }).format(showtime.price)}
                </p>
                <p>Seats: {booking.seats.join(", ")}</p>
              </>
            )}
            <p className="font-bold">
              Total:{" "}
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "VND" }).format(
                booking.total
              )}
            </p>
          </div>

          <button onClick={onPaymentButtonClick} className="text-green-600 hover:text-green-800">
            Pay
          </button>
        </div>
      </div>
    </main>
  );
}

export default Payment;
