import { Col, Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import Product from '../components/Product';
// import { useCart } from '../features/cart/useCart';
import { useProducts } from '../features/products/useProducts';

function HomeScreen() {
  const { products, isPending: productsIsPending } = useProducts();
  // const { cart, isPending: cartIsPending } = useCart();

  if (productsIsPending) {
    return <Loader />;
  }

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
