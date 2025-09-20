import CryptoJS from "crypto-js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { getAllCineplexsAction } from "../redux/actions/cineplexActions";
import {
  changeDayShowtimeAction,
  getAllShowtimesByCineplexAction,
} from "../redux/actions/showtimeActions";
import { getCineplexsSelector } from "../redux/selectors/cineplexSelector";
import { getAllShowtimesByCineplexSelector } from "../redux/selectors/showtimeSelector";

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
      dispatch({ type: "REMOVE_CINEPLEXS" });
      dispatch({ type: "REMOVE_ALL_SHOWTIMES" });
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
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-center text-2xl font-bold my-6">SHOWTIMES</h3>

        {/* Cineplex Selector */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Select Cineplex</label>
          <Select
            placeholder="CGV Cinemas"
            options={options}
            onChange={handleChangeCineplexId}
            theme={(theme) => ({
              ...theme,
              colors: { ...theme.colors, primary25: "#d4d4d4", primary: "#e71a0f" },
            })}
          />
        </div>

        <hr className="my-4" />

        {/* Days Selector */}
        <div className="mb-6">
          <div className="font-semibold mb-2">{message}</div>
          <div className="flex flex-wrap gap-3">
            {data.map((item, i) => {
              const day = moment(item.date, "DD/MM/YYYY").toDate();
              const isActive = activeDayIndex === i;

              return (
                <div
                  key={i}
                  onClick={() =>
                    handleDayClick({ id: i, value: moment(day).format("DD/MM/YYYY") }, i)
                  }
                  className={`cursor-pointer p-3 rounded-lg border text-center ${
                    isActive
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-gray-100 text-gray-800 border-gray-300"
                  }`}
                >
                  <span className="block">{moment(day).format("M")}</span>
                  <em className="block">{moment(day).format("ddd")}</em>
                  <strong className="block">{moment(day).format("D")}</strong>
                </div>
              );
            })}
          </div>
        </div>

        <hr className="my-4" />

        {/* Movies & Showtimes */}
        {movies.length > 0 &&
          movies.map((movie, i) => {
            const url = "/movies/detail/" + movie.slug;

            return (
              <div key={i} className="mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Movie Poster */}
                  <Link to={url} className="md:w-1/4">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="rounded-lg object-cover w-full h-72"
                    />
                  </Link>

                  {/* Movie Info & Showtimes */}
                  <div className="flex-1">
                    <Link to={url}>
                      <h5 className="font-bold mb-2">{movie.title}</h5>
                    </Link>
                    <hr className="my-2" />

                    {movie.showtimes.map((showtime, s) => (
                      <div key={s} className={s !== 0 ? "mt-4" : ""}>
                        <h6 className="font-semibold mb-2">
                          {showtime.type_name === "2D"
                            ? showtime.type_name + " – Vietnamese Subtitles"
                            : showtime.type_name}
                        </h6>
                        <div className="flex flex-wrap gap-2">
                          {showtime.list.map((item, l) => {
                            const hashId =
                              CryptoJS.MD5(item.start_time).toString() + item.id;

                            return (
                              <Link
                                key={l}
                                to={`/booking/tickets/${hashId}`}
                                className="px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-200"
                              >
                                {moment(item.start_time).format("HH:mm A")}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="my-6" />
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default Showtime;
