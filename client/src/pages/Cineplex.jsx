import React, { useEffect, useState, memo } from 'react';
import { Container, Row, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCineplexsAction, getCineplexItemAction } from '../../redux/actions/cineplexActions';
import { getCineplexsSelector } from './../../redux/selectors/cineplexSelector';

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
      title={cineplexs.item.name}
      allowFullScreen
      width="100%"
      height="333"
      loading="lazy"
      src={src}
      style={{ border: '0' }}
    />
  ));

  useEffect(() => {
    dispatch(getAllCineplexsAction());
    return () => {
      dispatch({ type: 'REMOVE_CINEPLEXS' });
    };
  }, [dispatch]);

  return (
    <main className="flex-shrink-0">
      <Container className="w-75">
        <Row>
          <h3 className="text-center">CGV CINEMAS</h3>
        </Row>
        <Row>
          <div className="d-flex flex-wrap mt-2">
            {cineplexs.data.map((cineplex) => (
              <div key={cineplex.id} className="w-25">
                <span
                  onClick={() => onCineplexSelectionChanged(cineplex.id)}
                  style={{
                    cursor: 'pointer',
                    padding: '6px 12px',
                    margin: '4px',
                    display: 'inline-block',
                    borderRadius: '4px',
                    backgroundColor: selectedId === cineplex.id ? '#e71a0f' : 'transparent',
                    color: selectedId === cineplex.id ? '#fff' : '#000',
                    fontWeight: selectedId === cineplex.id ? 600 : 400,
                    transition: '0.2s all',
                  }}
                >
                  {cineplex.name}
                </span>
              </div>
            ))}
          </div>
        </Row>

        {cineplexs.item && Object.keys(cineplexs.item).length > 0 && (
          <Row>
            <div className="text-center mt-4">
              <img
                src="https://www.cgv.vn/skin/frontend/cgv/default/images/h3_theater.gif"
                alt="h3_theater"
              />
              <h3 className="mt-4">{cineplexs.item.name}</h3>
              <h6 className="mt-1">{cineplexs.item.address}</h6>
            </div>
            <div>
              <Image className="cineplex-img" src={cineplexs.item.image} />
            </div>
            <div className="text-center mt-1">
              <GoogleMapIframe src={cineplexs.item.googleMapsUrl} />
            </div>
          </Row>
        )}
      </Container>
    </main>
  );
}

export default Cineplex;
