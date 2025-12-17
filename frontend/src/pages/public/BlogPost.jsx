import { Link, useParams } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const BlogPost = () => {
  const { slug } = useParams();
  const { data, loading } = usePublicData(`/blog/${slug}`);
  if (loading || !data) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <Link to="/blog" className="btn btn-outline-secondary mb-4">← Volver</Link>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          {data.cover_image && (
            <img src={data.cover_image} alt={data.title} className="img-fluid rounded mb-4 w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          )}
          <h1 className="mb-3">{data.title}</h1>
          <p className="text-muted mb-4">Publicado el {new Date(data.created_at).toLocaleDateString()}</p>
          <div className="prose" style={{ whiteSpace: 'pre-line' }}>{data.content}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
