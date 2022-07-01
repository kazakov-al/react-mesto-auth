import { Link } from 'react-router-dom';
import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип проекта «Mesto»"
        />
      </Link>
    </header>
  );
}

export default Header;
