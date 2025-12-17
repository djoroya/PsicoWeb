import { Link } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const Blog = () => {
  const { data, loading } = usePublicData('/blog');
  if (loading || !data) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
  return (
    <div className="container py-5">
      <h1>Blog</h1>
      <div className="row g-3">
        {data.map((post) => (
          <div className="col-md-4" key={post._id}>
            <div className="card h-100">
              {post.cover_image && <img src={post.cover_image} className="card-img-top" alt={post.title} />}
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="text-muted small">{new Date(post.created_at).toLocaleDateString()}</p>
                <Link to={`/blog/${post.slug}`} className="btn btn-primary">Leer artículo</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
