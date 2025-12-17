import { useAppContext } from '@context/AppContext';

const ErrorMessage = () => {
    const { error } = useAppContext();

    if (!error) return null;

    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i> {error}
        </div>
    );
};

export default ErrorMessage;
