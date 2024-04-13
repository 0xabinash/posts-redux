import '../App.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="header">
      <h1>Posts</h1>
      <nav>
        <ul>
          <li>
            <NavLink className="nav__btn" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__btn" to="post">
              Post
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__btn" to="user">
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
