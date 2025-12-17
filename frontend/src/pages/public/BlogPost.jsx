import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const BlogPost = () => {
  const { slug } = useParams();
  const { data, loading } = usePublicData(`/blog/${slug}`);
  if (loading || !data) return <Spinner animation="border" />;
  return (
    <div>
      <h1>{data.title}</h1>
      {data.cover_image && <img src={data.cover_image} alt={data.title} className="img-fluid mb-3" />}
      <p className="text-muted">{new Date(data.created_at).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
};

export default BlogPost;
