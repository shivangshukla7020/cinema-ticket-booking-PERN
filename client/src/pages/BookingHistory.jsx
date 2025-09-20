import moment from 'moment';
import React, { useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userGetBookingAction } from '../../redux/actions/bookingActions';
import { getUserSelector } from '../../redux/selectors/authSelector';
import { userGetBookingSelector } from '../../redux/selectors/bookingSelector';

function BookingHistory() {
  const user = useSelector(getUserSelector);
  const bookings = useSelector(userGetBookingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userGetBookingAction());

    return () => {
      dispatch({ type: 'REMOVE_USER_BOOKINGS' });
    };
  }, [dispatch]);

  if (!user) return <Redirect to="/login" />;

  return (
    <main className="flex-shrink-0">
      <Container className="w-50">
        <Row>
          <h3 className="text-center">Booking History</h3>
        </Row>
        <Row className="mt-3">
          <Col className="ps-3 pe-0">
            <hr />
          </Col>
        </Row>

        {bookings.length === 0 ? (
          <p className="text-center mt-3">No bookings found.</p>
        ) : (
          bookings.map((booking, i) => {
            const barcodeUrl = `https://www.barcodesinc.com/generator/image.php?code=${booking.b_number}&style=196&type=C128B&width=180&height=60&xres=1&font=16`;

            return (
              <React.Fragment key={i}>
                <Row className="mt-3">
                  <Col md={3} className="px-3">
                    <Image
                      className="img-cover w-100"
                      src={booking.Showtime.Movie.poster}
                      height={260}
                    />
                  </Col>
                  <Col className="px-0">
                    <h5 className="fw-bold">
                      {booking.Showtime.Movie.title} ({booking.Showtime.Cinema.CinemaType.name})
                    </h5>
                    <hr className="my-1" />

                    <p>
                      <strong>Booking ID:</strong> {booking.b_number} |{' '}
                      <strong>Booking Time:</strong>{' '}
                      {moment(booking.createdAt).format('DD/MM/YYYY - HH:mm A')}
                    </p>

                    <p>
                      <strong>Showtime:</strong>{' '}
                      {moment(booking.Showtime.start_time).format('DD/MM/YYYY')} -{' '}
                      {moment(booking.Showtime.start_time).format('HH:mm A')} ~{' '}
                      {moment(booking.Showtime.end_time).format('HH:mm A')}
                    </p>

                    <p>
                      <strong>Cinema:</strong> {booking.Showtime.Cinema.Cineplex.name} |{' '}
                      <strong>Room:</strong> {booking.Showtime.Cinema.name}
                    </p>

                    <p>
                      <strong>Seats:</strong>{' '}
                      {booking.Tickets.map((ticket, index) =>
                        index === 0 ? ticket.seat_code : `, ${ticket.seat_code}`
                      )}{' '}
                      | <strong>Price:</strong> {booking.Tickets.length} x{' '}
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(booking.Tickets[0].price)}
                    </p>

                    <p>
                      <strong>Total:</strong>{' '}
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(booking.total)}
                    </p>

                    <Image className="img-cover" src={barcodeUrl} height={80} width={330} />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col className="ps-3 pe-0">
                    <hr />
                  </Col>
                </Row>
              </React.Fragment>
            );
          })
        )}
      </Container>
    </main>
  );
}

export default BookingHistory;
