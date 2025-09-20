import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShowtimeSeatsSelector } from '../../../../redux/selectors/showtimeSelector';
import { getShowtimeSeatsAction } from '../../../../redux/actions/showtimeActions';
import { updateBookingAction } from '../../../../redux/actions/bookingActions';

const seatStyle = {
  base: {
    backgroundColor: '#ffffff',
    color: 'black',
    height: '35px',
    width: '40px',
    margin: '3px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    border: '1px solid #e71a0f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: '16px',
    transition: 'transform 0.1s',
  },
  selected: {
    backgroundColor: '#e71a0f',
    color: '#fff',
  },
  occupied: {
    backgroundColor: '#797979',
    color: '#fff',
    border: '1px solid #797979',
  },
  hoverable: {
    cursor: 'pointer',
  },
  nonHover: {
    cursor: 'default',
    transform: 'none',
  },
};

const screenStyle = {
  display: 'block',
  margin: '0 auto 16px auto',
  width: '75%',
};

const rowSeatStyle = {
  display: 'flex',
  justifyContent: 'center',
};

function Seats({ data }) {
  const seats = useSelector(getShowtimeSeatsSelector);
  const dispatch = useDispatch();

  const onClickSeat = (e) => {
    if (e.target.dataset.status === 'available') {
      const seat = e.target.innerText;
      const price = data.price;
      dispatch(updateBookingAction(seat, price, e));
    }
  };

  const onAlertExistSeat = () => {
    alert('This seat cannot be selected!');
  };

  useEffect(() => {
    dispatch(getShowtimeSeatsAction(data.id));

    return () => {
      dispatch({ type: 'REMOVE_SEATS' });
    };
  }, [dispatch, data]);

  return (
    <>
      <div style={{ marginTop: '16px' }}>
        <img
          style={screenStyle}
          alt="screen"
          src="https://i.imgur.com/VDoCPqg.png"
        />
        {seats.map((row, i) => (
          <div key={i} style={rowSeatStyle}>
            {row.array.map((code, r) => {
              const isOccupied = code.isReserved;
              const isSelected = code.isSelected;
              const appliedStyle = {
                ...seatStyle.base,
                ...(isOccupied ? seatStyle.occupied : {}),
                ...(isSelected ? seatStyle.selected : {}),
              };

              return (
                <div
                  key={r}
                  style={appliedStyle}
                  onClick={isOccupied ? onAlertExistSeat : onClickSeat}
                  onMouseOver={(e) => {
                    if (!isOccupied && !isSelected) e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => (e.target.style.transform = 'none')}
                  data-status={isOccupied ? 'occupied' : 'available'}
                >
                  {code.seat}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Seat Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ ...seatStyle.base, ...seatStyle.occupied, marginRight: '6px' }}></div>
          <label>Available</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '0 24px' }}>
          <div style={{ ...seatStyle.base, ...seatStyle.selected, marginRight: '6px' }}></div>
          <label>Selected</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ ...seatStyle.base, ...seatStyle.occupied, marginRight: '6px' }}></div>
          <label>Unavailable</label>
        </div>
      </div>
    </>
  );
}

export default Seats;
