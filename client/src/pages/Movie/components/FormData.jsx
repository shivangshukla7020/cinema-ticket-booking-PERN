import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMovieShowtimesAction } from '../../../redux/actions/movieActions';
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';

function FormData({ movieId, data }) {
  const dispatch = useDispatch();
  const [activeDay, setActiveDay] = useState(0);

  // Generate an array of past 9 days
  const timeFrom = (X) => {
    const dates = [];
    for (let I = 0; I < Math.abs(X); I++) {
      const day = new Date(
        new Date().getTime() - I * 24 * 60 * 60 * 1000
      ).toISOString();
      dates.push(moment(day).format());
    }
    return dates;
  };

  const days = timeFrom(-9);

  const onChangeDay = (index, value) => {
    setActiveDay(index);

    dispatch({ type: 'GET_MOVIE_SHOWTIMES_FAIL' });

    dispatch(
      getMovieShowtimesAction(movieId, {
        day: value,
      })
    );
  };

  return (
    <div className="w-full">
      {/* Day selection */}
      <div className="flex justify-between flex-wrap w-full max-w-4xl mx-auto mb-4">
        {days.map((day, i) => (
          <div
            key={i}
            onClick={() => onChangeDay(i, moment(day).format('YYYY-MM-DD'))}
            className={`cursor-pointer text-center px-3 py-2 rounded-lg mb-2 transition-all ${
              activeDay === i ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-red-200'
            }`}
          >
            <span className="block text-sm">{moment(day).format('M')}</span>
            <em className="block text-xs">{moment(day).format('ddd')}</em>
            <strong className="block text-lg">{moment(day).format('D')}</strong>
          </div>
        ))}
      </div>
      <hr className="my-3" />

      {/* Showtimes */}
      {data.map((item, i) =>
        item.showtimes.length > 0 ? (
          <div key={i} className="mb-6">
            <strong className="block mb-2 text-lg">{item.name}</strong>
            <div className="flex flex-wrap justify-center gap-2">
              {item.showtimes.map((showtime) => {
                const hashId =
                  CryptoJS.MD5(showtime.start_time).toString() + showtime.id;
                return (
                  <Link
                    to={`/booking/tickets/${hashId}`}
                    key={showtime.id}
                    className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-red-200 transition text-gray-800"
                  >
                    {moment(showtime.start_time).format('HH:mm A')}
                  </Link>
                );
              })}
            </div>
            <hr className="my-3" />
          </div>
        ) : null
      )}
    </div>
  );
}

export default FormData;
