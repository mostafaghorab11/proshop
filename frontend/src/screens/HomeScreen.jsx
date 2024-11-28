import { Col, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';
import { useUser } from '../features/auth/useUser';
import { useProducts } from '../features/products/useProducts';

function HomeScreen() {
  const { data, isPending: productsIsPending } = useProducts();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search') || '';

  const { user } = useUser();

  if (productsIsPending) {
    return <Loader />;
  }
  const { products, page, pages } = data;

  return (
    <>
      {!search ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {products.length > 0 ? (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            isAdmin={user.isAdmin}
            search={search}
          />
        </>
      ) : (
        <Message>No products found</Message>
      )}
    </>
  );
}

export default HomeScreen;
