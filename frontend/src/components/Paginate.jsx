import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, search = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            as={Link}
            key={x + 1}
            to={
              !isAdmin
                ? `/?search=${search}&page=${x + 1}`
                : `/admin/products/?search=${search}&page=${x + 1}`
            }
            active={x + 1 === page}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
