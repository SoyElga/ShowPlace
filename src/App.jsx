import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/views/LoginPage';
import ProfilePage from './components/views/ProfilePage';
import SearchPage from './components/views/SearchPage';
import BookingFlow from './components/views/BookingFlow';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home" element={<SearchPage />} />
        <Route path="/booking" element={<BookingFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
