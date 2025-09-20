import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCineplexsAction, getCineplexItemAction } from "../redux/actions/cineplexActions";
import { getCineplexsSelector } from "../redux/selectors/cineplexSelector";

function Cineplex() {
  const cineplexs = useSelector(getCineplexsSelector);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);

  const onCineplexSelectionChanged = (cineplexId) => {
    setSelectedId(cineplexId);
    dispatch(getCineplexItemAction(cineplexId));
  };

  const GoogleMapIframe = memo(({ src }) => (
    <iframe
      title={cineplexs.item?.name}
      allowFullScreen
      width="100%"
      height="333"
      loading="lazy"
      src={src}
      className="border-0 rounded"
    />
  ));

  useEffect(() => {
    dispatch(getAllCineplexsAction());
    return () => {
      dispatch({ type: "REMOVE_CINEPLEXS" });
    };
  }, [dispatch]);

  return (
    <main className="flex-shrink-0">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-center text-2xl font-bold my-6">CGV CINEMAS</h3>

        {/* Cineplex list */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {cineplexs.data?.map((cineplex) => (
            <button
              key={cineplex.id}
              onClick={() => onCineplexSelectionChanged(cineplex.id)}
              className={`px-4 py-2 rounded transition-all duration-200 font-medium ${
                selectedId === cineplex.id
                  ? "bg-red-500 text-white font-semibold"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {cineplex.name}
            </button>
          ))}
        </div>

        {/* Selected Cineplex details */}
        {cineplexs.item && Object.keys(cineplexs.item).length > 0 && (
          <div className="text-center space-y-4">
            <img
              src="https://www.cgv.vn/skin/frontend/cgv/default/images/h3_theater.gif"
              alt="h3_theater"
              className="mx-auto"
            />
            <h3 className="text-xl font-bold">{cineplexs.item.name}</h3>
            <h6 className="text-gray-600">{cineplexs.item.address}</h6>

            <img
              src={cineplexs.item.image}
              alt={cineplexs.item.name}
              className="mx-auto rounded-lg"
            />

            <div className="mt-4">
              <GoogleMapIframe src={cineplexs.item.googleMapsUrl} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cineplex;
