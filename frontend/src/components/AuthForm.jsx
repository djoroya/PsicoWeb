import { useState } from 'react';
import { useAppContext } from '@context/AppContext';

const AuthForm = () => {
    const { login, register } = useAppContext();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const result = await login(username, password);
                if (!result.success) {
                    setError(result.error);
                }
            } else {
                const result = await register(username, password);
                if (result.success) {
                    setIsLogin(true);
                    setError('Registration successful! Please login.');
                } else {
                    setError(result.error);
                }
            }
            setUsername('');
            setPassword('');
        } catch (err) {
            setError(err.message || 'Connection error');
        }
    };

    return (
        <div className="card shadow">
            <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">
                    📝 To-Do List
                </h2>
                <h3 className="text-center mb-4">
                    {isLogin ? 'Login' : 'Register'}
                </h3>
                {error && (
                    <div className={`alert ${error.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <span className="text-muted">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    </span>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                        className="text-decoration-none"
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
