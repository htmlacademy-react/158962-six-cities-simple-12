import { Link } from 'react-router-dom';
import Header from '../../components/header/header';

const NotFound = (): JSX.Element => (
  <div className="container">
    <Header />
    <h1>404 Not Found</h1>
    <Link to="/">Go to main page</Link>
  </div>
);

export default NotFound;
