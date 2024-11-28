import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchBox() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  const [search, setSearch] = useState(searchQuery || '');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      queryParams.set('search', search);
      navigate(`/?search=${search}`);
    }
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      />
    </Form>
  );
}

export default SearchBox;
