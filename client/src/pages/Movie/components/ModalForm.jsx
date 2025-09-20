import React, { useEffect, useState } from 'react';
import FormData from './FormData';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieShowtimesSelector } from '../../../redux/selectors/movieSelector';
import { getMovieShowtimesAction } from '../../../redux/actions/movieActions';
import moment from 'moment';

function ModalForm({ movie, isShow }) {
  const [show, setShow] = useState(isShow);
  const showtimes = useSelector(getMovieShowtimesSelector);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: 'GET_MOVIE_SHOWTIMES_FAIL' });
    setShow(false);
  };

  const handleShow = () => {
    dispatch(
      getMovieShowtimesAction(movie.id, {
        day: moment().format('YYYY-MM-DD'),
      })
    );
    setShow(true);
  };

  useEffect(() => {
    return () => {
      dispatch({ type: 'REMOVE_MOVIE_SHOWTIMES' });
    };
  }, [dispatch]);

  return (
    <>
      <button
        type="button"
        onClick={handleShow}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2"
      >
        <span>Mua vé</span>
        <i className="bi bi-wallet2 text-lg"></i>
      </button>

      {/* Modal */}
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg relative">
            {/* Header */}
            <div className="flex justify-end p-2">
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              <FormData movieId={movie.id} data={showtimes} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalForm;
