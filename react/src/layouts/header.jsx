import { useSelector, useDispatch } from "react-redux";
import { userSlice } from "../redux/userSlice";
import argentBankLogo from "../img/argentBankLogo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userSlice.actions.logout());
    navigate("/sign-in");
  };

  if (user && user.isLoggedIn) {
    return (
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/user/update">
            <i className="fa fa-user-circle"></i>
            {user && user.firstName}
          </Link>
          <Link onClick={handleLogout} className="main-nav-item" to="/">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="main-nav">
        <a className="main-nav-logo" href="./">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
    );
  }
}

export default Header;
