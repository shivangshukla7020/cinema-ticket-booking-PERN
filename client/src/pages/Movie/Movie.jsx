import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, Link } from 'react-router-dom';
import { getAllMoviesByStateAction } from '../../redux/actions/movieActions';
import { getMoviesSelector } from '../../redux/selectors/movieSelector';
import moment from 'moment';

function Movie() {
  const { state } = useParams();
  const movies = useSelector(getMoviesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesByStateAction({ state }));

    return () => {
      dispatch({ type: 'REMOVE_MOVIES' });
    };
  }, [dispatch, state]);

  if (state !== 'now-showing' && state !== 'coming-soon') {
    return <Redirect to="/movies/now-showing" />;
  }

  const MovieList = React.memo(({ data }) => (
    <main className="flex-shrink-0">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-center text-2xl font-bold my-6">
          {state === 'now-showing' ? 'PHIM ĐANG CHIẾU' : 'PHIM SẮP CHIẾU'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {data.map((item, i) => {
            const url = '/movies/detail/' + item.slug;
            return (
              <div key={i} className="flex flex-col h-full">
                <Link
                  to={url}
                  className="flex flex-col items-start hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-[220px] h-[350px] object-cover rounded-lg"
                  />
                  <h3 className="font-bold text-lg mt-2">{item.title}</h3>
                </Link>

                <div className="mt-2 space-y-1">
                  <p>
                    <span className="font-semibold">Thể loại: </span>
                    {item.genre}
                  </p>
                  <p>
                    <span className="font-semibold">Thời lượng: </span>
                    {item.running_time} phút
                  </p>
                  <p>
                    <span className="font-semibold">Khởi chiếu: </span>
                    {moment(item.release_date).format('DD/MM/YYYY')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  ));

  return <MovieList data={movies} />;
}

export default Movie;
