import './App.css';
import { useAppContext } from './context/AppContext';
import AuthForm from './components/AuthForm';
import UserPanel from './components/UserPanel/UserPanel';
import AdminPanel from './components/AdminPanel/AdminPanel';

function App() {
  const { isAuthenticated, isAdmin } = useAppContext();

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            {!isAuthenticated ? (
              <AuthForm />
            ) : isAdmin ? (
              <AdminPanel />
            ) : (
              <UserPanel />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
