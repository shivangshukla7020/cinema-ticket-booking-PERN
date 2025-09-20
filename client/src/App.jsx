import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home/Home';
import MoviePage from './pages/Movie/Movie';
import CineplexPage from './pages/Cineplex';
import ShowtimePage from './pages/Showtime';
import MovieDetailPage from './pages/Movie/MovieDetail';
import BookingPage from './pages/Booking/Booking';
import PaymentPage from './pages/Payment/Payment';
import ProfilePage from './pages/Profile/Profile';
import HistoryPage from './pages/BookingHistory';
import PaymentDetailPage from './pages/Payment/PaymentDetail';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import EnterCode from './pages/Auth/EnterCode';
import VerifiedEmail from './pages/Auth/VerifiedEmail';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import ChangePassword from './pages/Auth/ChangePassword';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Header />
        <main className="flex-grow">
          <Switch>
            <Redirect exact from="/movies" to="/movies/now-showing" />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/movies/:state" component={MoviePage} />
            <Route exact path="/cineplexs" component={CineplexPage} />
            <Route exact path="/showtimes" component={ShowtimePage} />
            <Route exact path="/movies/detail/:slug" component={MovieDetailPage} />
            <Route exact path="/booking/tickets/:showtimeId" component={BookingPage} />
            <Route exact path="/payment" component={PaymentPage} />
            <Route exact path="/payment/:id" component={PaymentDetailPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/history" component={HistoryPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/enter-code" component={EnterCode} />
            <Route exact path="/verified-email" component={VerifiedEmail} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route exact path="/change-password" component={ChangePassword} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
