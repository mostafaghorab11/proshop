import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../../components/Loader';
import useCreateProduct from '../../features/products/useCreateProduct';
import useDeleteProduct from '../../features/products/useDeleteProduct';
import { useProducts } from '../../features/products/useProducts';

function ProductListScreen() {
  const { products, isPending } = useProducts();
  const { deleteProduct } = useDeleteProduct();
  const { createProduct } = useCreateProduct();

  // handle delete product
  const handleDeleteProduct = (id) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirm) {
      deleteProduct(id);
    }
  };

  const handleCreateProduct = () => {
    const confirm = window.confirm(
      'Are you sure you want to create a new product?'
    );
    if (confirm) {
      createProduct();
    }
  };

  if (isPending) return <Loader />;
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={handleCreateProduct}>
            <FaEdit /> Create
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant="light" className="btn-sm mx-2">
                    <FaEdit />
                  </Button>
                </LinkContainer>
              </td>
              <td>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  <FaTrash style={{ color: 'white' }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ProductListScreen;
