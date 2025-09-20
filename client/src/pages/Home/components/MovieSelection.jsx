import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesSelector } from '../../../../redux/selectors/movieSelector';
import { getAllMoviesByStateAction } from '../../../../redux/actions/movieActions';
import { Link } from 'react-router-dom';

function MovieSelection() {
  const movies = useSelector(getMoviesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesByStateAction({ state: 'now-showing' }));

    return () => {
      dispatch({ type: 'REMOVE_MOVIES' });
    };
  }, [dispatch]);

  return (
    <div className="text-center mt-6">
      <img
        src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/h3_movie_selection.gif"
        alt="movie-selection"
        className="mx-auto mb-4"
      />

      <div className="container mx-auto px-0">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={4}
          spaceBetween={6}
          slidesPerGroup={1}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{ clickable: true }}
          navigation={true}
          className="w-3/4 mx-auto"
        >
          {movies.map((movie, i) => (
            <SwiperSlide key={i} className="flex justify-center">
              <Link to={`/movies/detail/${movie.slug}`}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-[240px] h-[355px] object-cover rounded-md cursor-pointer"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieSelection;
