import { Col, Row } from 'react-bootstrap';
import { useProducts } from '../../features/products/useProducts';
import Loader from '../components/Loader';
import Product from '../components/Product';

function HomeScreen() {
  const { products, isPending } = useProducts();
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get(`/api/products`);
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  if (isPending) {
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
