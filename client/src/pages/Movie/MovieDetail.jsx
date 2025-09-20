import React, { useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieBySlugSelector } from '../../../redux/selectors/movieSelector';
import { getMovieBySlugAction } from '../../../redux/actions/movieActions';
import moment from 'moment';
import ModalForm from '../components/ModalForm';

function MovieDetail() {
  const { slug } = useParams();
  const movie = useSelector(getMovieBySlugSelector);
  const dispatch = useDispatch();

  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const VideoIframe = React.memo(({ src, height }) => (
    <iframe
      className="w-full mx-0 mb-0"
      title={movie.title}
      height={height}
      allowFullScreen
      src={src}
    />
  ));

  const ScrollToTopOnMount = () => {
    useLayoutEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    return null;
  };

  useEffect(() => {
    dispatch(getMovieBySlugAction(slug));

    return () => {
      dispatch({ type: 'REMOVE_MOVIE_DETAIL' });
    };
  }, [dispatch, slug]);

  return (
    <main className="flex-shrink-0">
      <ScrollToTopOnMount />
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Poster */}
          <div className="md:w-1/4 w-full">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-[345px] object-cover rounded-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1">
            <h5 className="font-bold text-lg">{movie.title}</h5>
            <hr className="my-1" />
            <p>
              <span className="font-semibold">Đạo diễn: </span>
              <span>{movie.director}</span>
            </p>
            <p>
              <span className="font-semibold">Diễn viên: </span>
              <span>{movie.actor}</span>
            </p>
            <p>
              <span className="font-semibold">Thể loại: </span>
              <span>{movie.genre}</span>
            </p>
            <p>
              <span className="font-semibold">Khởi chiếu: </span>
              <span>{moment(movie.release_date).format('DD/MM/YYYY')}</span>
            </p>
            <p>
              <span className="font-semibold">Thời lượng: </span>
              <span>{movie.running_time} phút</span>
            </p>

            {movie.state === 'now-showing' && (
              <div className="mt-2">
                <ModalForm movie={movie} isShow={false} />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p>{movie.description}</p>
        </div>

        {/* Trailer */}
        {movie.trailer && (
          <div className="mt-6 text-center">
            <VideoIframe
              height={444}
              src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                movie.trailer
              )}`}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default MovieDetail;
