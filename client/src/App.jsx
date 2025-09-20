import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      <Router>
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* <Route path="/movies" element={<Navigate to="/movies/now-showing" replace />} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:state" element={<MoviePage />} />
            <Route path="/cineplexs" element={<CineplexPage />} />
            <Route path="/showtimes" element={<ShowtimePage />} />
            <Route path="/movies/detail/:slug" element={<MovieDetailPage />} />
            <Route path="/booking/tickets/:showtimeId" element={<BookingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment/:id" element={<PaymentDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/enter-code" element={<EnterCode />} />
            <Route path="/verified-email" element={<VerifiedEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
