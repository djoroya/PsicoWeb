import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadImage } from '../services/apiClient';

const ImageUpload = ({ value, onChange, label = 'Imagen' }) => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setError(null);

        try {
            const url = await uploadImage(file, token);
            onChange(url);
        } catch (err) {
            setError('Error al subir la imagen. Inténtalo de nuevo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-2">
            <label className="form-label">{label}</label>
            <div className="d-flex flex-column gap-2">
                {value && (
                    <div className="mb-2">
                        <img
                            src={value}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: '150px', maxWidth: '100%' }}
                        />
                    </div>
                )}

                <div className="d-flex align-items-center gap-2">
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={loading}
                    />
                    {loading && (
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    )}
                </div>
                {error && <div className="text-danger small">{error}</div>}
                {value && (
                    <div className="d-flex gap-2">
                        <small className="text-muted text-break">{value}</small>
                        <button
                            type="button"
                            className="btn btn-link btn-sm p-0 text-danger"
                            onClick={() => onChange('')}
                        >
                            Quitar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
