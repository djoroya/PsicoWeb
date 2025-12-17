import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import Home from './pages/public/Home';
import Services from './pages/public/Services';
import ServiceDetail from './pages/public/ServiceDetail';
import Treatments from './pages/public/Treatments';
import TreatmentDetail from './pages/public/TreatmentDetail';
import Team from './pages/public/Team';
import PsychologistDetail from './pages/public/PsychologistDetail';
import Blog from './pages/public/Blog';
import BlogPost from './pages/public/BlogPost';
import Contact from './pages/public/Contact';
import BookingPage from './pages/public/BookingPage';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminTreatments from './pages/admin/AdminTreatments';
import AdminTeam from './pages/admin/AdminTeam';
import AdminBlog from './pages/admin/AdminBlog';
import AdminSettings from './pages/admin/AdminSettings';
import AdminBookings from './pages/admin/AdminBookings';
import { useAuth } from './context/AuthContext';
import './App.css';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/servicios/:id" element={<ServiceDetail />} />
        <Route path="/tratamientos" element={<Treatments />} />
        <Route path="/tratamientos/:id" element={<TreatmentDetail />} />
        <Route path="/equipo" element={<Team />} />
        <Route path="/equipo/:id" element={<PsychologistDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/reservar" element={<BookingPage />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route
        path="/admin"
        element={(
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        )}
      >
        <Route index element={<Dashboard />} />
        <Route path="servicios" element={<AdminServices />} />
        <Route path="tratamientos" element={<AdminTreatments />} />
        <Route path="equipo" element={<AdminTeam />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="reservas" element={<AdminBookings />} />
      </Route>
    </Routes>
  );
}

export default App;
