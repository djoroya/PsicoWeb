import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePublicData } from '../../hooks/usePublicData';

const Blog = () => {
  const { data, loading } = usePublicData('/blog');
  if (loading || !data) return <Spinner animation="border" />;
  return (
    <div>
      <h1>Blog</h1>
      <Row className="g-3">
        {data.map((post) => (
          <Col md={4} key={post._id}>
            <Card>
              {post.cover_image && <Card.Img variant="top" src={post.cover_image} alt={post.title} />}
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <p className="text-muted">{new Date(post.created_at).toLocaleDateString()}</p>
                <Link to={`/blog/${post.slug}`}>Leer artículo</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Blog;
