import { useEffect } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../features/auth/useUser';
import useCreateOrder from '../features/orders/useCreateOrder';

function PlaceOrderScreen() {
  const { cart, dispatch } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const { createOrder, isPending } = useCreateOrder();

  useEffect(function () {
    // check if there is a shipping address and payment method
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  });

  const handlePlaceOrder = async () => {
    const order = {
      orderItems: cart.items,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.pricing.subtotal,
      taxPrice: cart.pricing.tax,
      shippingPrice: cart.pricing.shipping,
      totalPrice: cart.pricing.total,
    };

    await createOrder(order);
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Place Order</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {user.name} <br />
                <strong>Address:</strong> {cart.shippingAddress.address}{' '}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.items.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.items.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={6}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <strong>{item.name}</strong>
                        </Col>
                        <Col md={1}>
                          <strong>{item.quantity}</strong>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>$ {cart.pricing.subtotal}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>$ {cart.pricing.shipping}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>$ {cart.pricing.tax}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>$ {cart.pricing.total}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          {isPending ? (
            <Loader />
          ) : (
            <Button
              type="submit"
              variant="primary"
              className="btn-block"
              disabled={cart.items.length === 0 || isPending}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderScreen;
