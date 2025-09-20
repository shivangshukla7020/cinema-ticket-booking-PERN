import React from 'react';
import { useLocation, useParams, Navigate } from 'react-router-dom'; // <-- use Navigate
import moment from 'moment';

function PaymentDetail() {
  const location = useLocation();
  const { id } = useParams();
  const barcode = `https://www.barcodesinc.com/generator/image.php?code=${id}&style=196&type=C128B&width=600&height=80&xres=1&font=16`;

  if (!location.state) {
    return <Navigate to="/" replace />; // <-- v6 replacement
  }

  const { showtime = {}, booking = {} } = location.state;

  return (
    <main className="flex-shrink-0 py-6">
      <div className="max-w-5xl mx-auto px-4">
        {/* Success Header */}
        <div className="flex flex-col items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="65"
            height="65"
            fill="#4CAF50"
            className="mb-2"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
          </svg>
          <h3 className="text-center text-2xl font-bold">
            BOOKING SUCCESSFUL #{id}
          </h3>
          <img src={barcode} alt="barcode" className="my-4" />
        </div>

        {/* Movie & Booking Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center space-y-4 md:space-y-0 md:space-x-10">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <img
              src={showtime.Movie?.poster}
              alt={showtime.Movie?.title}
              className="w-48 h-72 object-cover rounded-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="flex flex-col space-y-1">
            <p className="font-bold text-lg">{showtime.Movie?.title}</p>
            <p className="text-gray-700">{showtime.Movie?.genre}</p>
            <p className="text-gray-600">{showtime.Cinema?.CinemaType?.name}</p>
          </div>

          {/* Showtime & Seats */}
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between">
              <p className="font-medium">Cinema:</p>
              <p className="font-bold">{showtime.Cinema?.Cineplex?.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Showtime:</p>
              <p className="font-bold">
                {moment(showtime.start_time).format('DD/MM/YYYY')} - (
                {moment(showtime.start_time).format('HH:mm A')} ~{' '}
                {moment(showtime.end_time).format('HH:mm A')})
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Room:</p>
              <p className="font-bold">{showtime.Cinema?.name}</p>
            </div>
            {booking.seats?.length > 0 && (
              <>
                <div className="flex justify-between">
                  <p className="font-medium">Price:</p>
                  <p className="font-bold">
                    {booking.seats.length} x{' '}
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(showtime.price)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Seats:</p>
                  <p className="font-bold">{booking.seats.join(', ')}</p>
                </div>
              </>
            )}
            <div className="flex justify-between mt-2">
              <p className="font-bold">Total:</p>
              <p className="font-bold text-red-600">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'VND',
                }).format(booking.total)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaymentDetail;
