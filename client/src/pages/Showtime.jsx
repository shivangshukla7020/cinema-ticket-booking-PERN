import CryptoJS from 'crypto-js';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { getAllCineplexsAction } from '../../redux/actions/cineplexActions';
import {
  changeDayShowtimeAction,
  getAllShowtimesByCineplexAction,
} from '../../redux/actions/showtimeActions';
import { getCineplexsSelector } from '../../redux/selectors/cineplexSelector';
import { getAllShowtimesByCineplexSelector } from '../../redux/selectors/showtimeSelector';

function Showtime() {
  const cineplexs = useSelector(getCineplexsSelector);
  const data = useSelector(getAllShowtimesByCineplexSelector);
  const message = useSelector((state) => state.showtime.message);
  const movies = useSelector((state) => state.showtime.movies);

  const dispatch = useDispatch();
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // Populate select options
  const options =
    cineplexs.data?.map((cineplex) => ({ value: cineplex.id, label: cineplex.name })) || [];

  useEffect(() => {
    dispatch(getAllCineplexsAction());

    return () => {
      dispatch({ type: 'REMOVE_CINEPLEXS' });
      dispatch({ type: 'REMOVE_ALL_SHOWTIMES' });
    };
  }, [dispatch]);

  const handleChangeCineplexId = (item) => {
    dispatch(getAllShowtimesByCineplexAction({ cineplex_id: item.value }));
  };

  const handleDayClick = (obj, index) => {
    setActiveDayIndex(index);
    dispatch(changeDayShowtimeAction(obj));
  };

  return (
    <main className="flex-shrink-0">
      <Container className="w-4/5 mx-auto">
        <Row>
          <h3 className="text-center text-2xl font-bold my-4">SHOWTIMES</h3>
        </Row>

        {/* Cineplex Selector */}
        <Row className="mb-4 px-36">
          <Form.Group>
            <Form.Label className="font-medium">Select Cineplex</Form.Label>
            <Select
              placeholder="CGV Cinemas"
              options={options}
              onChange={handleChangeCineplexId}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#d4d4d4',
                  primary: '#e71a0f',
                },
              })}
            />
          </Form.Group>
        </Row>

        <Row className="px-36">
          <hr className="my-2" />
        </Row>

        {/* Days Selector */}
        <Row className="mt-3 px-36">
          <div className="font-semibold mb-2">{message}</div>
          {data.length > 0 && (
            <Form.Group>
              <div className="flex flex-wrap gap-2">
                {data.map((item, i) => {
                  const day = moment(item.date, 'DD/MM/YYYY').toDate();
                  const isActive = activeDayIndex === i;

                  return (
                    <div
                      key={i}
                      onClick={() =>
                        handleDayClick({ id: i, value: moment(day).format('DD/MM/YYYY') }, i)
                      }
                      className={`cursor-pointer p-2 rounded-lg border ${
                        isActive ? 'bg-red-500 text-white border-red-500' : 'bg-gray-100 border-gray-300'
                      }`}
                    >
                      <span className="block text-center">{moment(day).format('M')}</span>
                      <em className="block text-center">{moment(day).format('ddd')}</em>
                      <strong className="block text-center">{moment(day).format('D')}</strong>
                    </div>
                  );
                })}
              </div>
            </Form.Group>
          )}
        </Row>

        <Row className="px-36 mt-3">
          <hr className="my-2" />
        </Row>

        {/* Movies & Showtimes */}
        {movies.length > 0 &&
          movies.map((movie, i) => {
            const url = '/movies/detail/' + movie.slug;

            return (
              <React.Fragment key={i}>
                <Row className="mt-6 px-36">
                  <Col md={3} className="px-3">
                    <Link to={url}>
                      <Image
                        className="rounded-lg object-cover w-full"
                        src={movie.poster}
                        height={300}
                      />
                    </Link>
                  </Col>

                  <Col className="px-0">
                    <Link to={url}>
                      <div className="mb-2">
                        <h5 className="font-bold">{movie.title}</h5>
                      </div>
                    </Link>
                    <hr className="my-1" />

                    {movie.showtimes.map((showtime, s) => (
                      <React.Fragment key={s}>
                        <div className={s === 0 ? '' : 'mt-3'}>
                          <h6 className="font-semibold">
                            {showtime.type_name === '2D'
                              ? showtime.type_name + ' – Vietnamese Subtitles'
                              : showtime.type_name}
                          </h6>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-2">
                            {showtime.list.map((item, l) => {
                              const hashId =
                                CryptoJS.MD5(item.start_time).toString() + item.id;

                              return (
                                <Link
                                  to={`/booking/tickets/${hashId}`}
                                  key={l}
                                  className="text-link"
                                >
                                  <div className="px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-200">
                                    {moment(item.start_time).format('HH:mm A')}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </Col>
                </Row>

                <Row className="px-36 mt-6">
                  <hr className="my-2" />
                </Row>
              </React.Fragment>
            );
          })}
      </Container>
    </main>
  );
}

export default Showtime;
