import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import useEditUser from '../../features/users/useEditUser';
import useUserForAdmin from '../../features/users/useUserForAdmin';

function UserEditScreen() {
  const { user, isPending } = useUserForAdmin();
  const { editUser, isPending: isEditPending } = useEditUser();

  // Initialize state with default values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]); // Re-run whenever the user data changes

  const handleEditUser = (e) => {
    e.preventDefault();
    const updatedUser = {
      _id: user._id,
      name,
      email,
      isAdmin,
    };
    console.log(updatedUser);
    try {
      editUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (isPending) return <Loader />;

  return (
    <>
      <Link className="btn btn-light my-3" to="/admin/users">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        <Form onSubmit={handleEditUser}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={isEditPending}>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default UserEditScreen;
