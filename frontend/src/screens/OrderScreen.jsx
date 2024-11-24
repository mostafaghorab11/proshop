import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useUser } from '../features/auth/useUser';
import useDeliverOrder from '../features/orders/useDeliverOrder';
import useOrder from '../features/orders/useOrder';
import usePayOrder from '../features/orders/usePayOrder';
import usePayPalClientId from '../features/orders/usePayPalClientId';

function OrderScreen() {
  // eslint-disable-next-line no-unused-vars
  const [_, paypalDispatch] = usePayPalScriptReducer();

  const { clientId, isPending: clientIdPending } = usePayPalClientId();
  const { order, isPending: orderPending } = useOrder();
  const { payOrder, isPending: payPending } = usePayOrder();
  const { deliverOrder, isPending: deliverPending } = useDeliverOrder();
  const { user, isPending: userPending } = useUser();

  useEffect(
    function () {
      if (clientId) {
        const loadPayPalScript = async () => {
          paypalDispatch({
            type: 'resetOptions',
            value: {
              'client-id': clientId,
              currency: 'USD',
            },
          });
          paypalDispatch({
            type: 'setLoadingStatus',
            value: 'pending',
          });
        };
        if ((order, !order?.isPaid)) {
          if (!window.paypal) {
            loadPayPalScript();
          }
        }
      }
    },
    [clientId, paypalDispatch, order, order?.isPaid]
  );

  if (
    clientIdPending ||
    orderPending ||
    payPending ||
    deliverPending ||
    userPending
  )
    return <Loader />;

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprovePayment = async (data, actions) => {
    const details = await actions.order.capture();
    payOrder({ details });
    // console.log(details);
  };

  const onErrorPayment = (data, actions) => {
    console.log(data);
    console.log(actions);
  };

  if (!order) return <div>Order Not Found</div>;

  return (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              <Row>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order.paymentMethod}{' '}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.quantity} x ${item.price} = $
                      {item.quantity * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {payPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprovePayment}
                        onError={onErrorPayment}
                      />
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {user.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  {deliverPending ? (
                    <Loader />
                  ) : (
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrder}
                    >
                      Mark As Delivered
                    </Button>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;
