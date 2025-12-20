import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdmissionForm from './components/AdmissionForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Admin panel - accessible only via /admin route */}
        <Route path="/admission" element={<AdmissionForm />} />

        {/* Protected by isAdmin check inside Admin component */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
