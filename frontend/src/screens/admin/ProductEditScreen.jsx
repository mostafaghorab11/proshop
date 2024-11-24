import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { useProduct } from '../../features/products/useProduct';
import useUpdateProduct from '../../features/products/useUpdateProduct';
import useUploadImage from '../../features/products/useUploadImage';

function ProductEditScreen() {
  const { product, isPending: productPending } = useProduct();
  const { updateProduct, isPending: updatePending } = useUpdateProduct();
  const { uploadImage, isPending: uploadPending } = useUploadImage();

  // Initialize state with default values
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCount] = useState(0);
  const [description, setDescription] = useState('');

  // Sync state with fetched product once it's available
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || 0);
      setImage(product.image || '');
      setBrand(product.brand || '');
      setCategory(product.category || '');
      setCount(product.countInStock || 0);
      setDescription(product.description || '');
    }
  }, [product]); // Re-run whenever the product data changes

  const handleEditProduct = (e) => {
    e.preventDefault();
    const updatedProduct = {
      _id: product._id,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    try {
      updateProduct(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleUploadImage = (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      uploadImage(formData, {
        onSuccess: (path) => {
          setImage(path);
        },
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  if (productPending) return <Loader />;

  return (
    <>
      <Link className="btn btn-light my-3" to="/admin/products">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        <Form onSubmit={handleEditProduct}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control type="text" value={image} readOnly />
          </Form.Group>

          <Form.Group className="mb-3" controlId="imageFile">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={handleUploadImage} />
            {uploadPending && <Loader />}
          </Form.Group>

          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              value={countInStock}
              onChange={(e) => setCount(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={updatePending}>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default ProductEditScreen;
