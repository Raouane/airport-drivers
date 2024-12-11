import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import BookingPage from './pages/BookingPage';
import ThankYouPage from './pages/ThankYouPage';
import ScrollToTop from './components/ScrollToTop';
import { DriversProvider } from './context/DriversContext';

function App() {
  return (
    <DriversProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#1A1A1A] text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DriversProvider>
  );
}

export default App;
