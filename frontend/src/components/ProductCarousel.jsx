import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useTopProducts from '../features/products/useTopProducts';
import Loader from './Loader';

function ProductCarousel() {
  const { topProducts, isPending } = useTopProducts();

  if (isPending) return <Loader />;

  return (
    <Carousel pause="hover" className="bg-primary mb-4">
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{ height: '500px' }}
            />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
