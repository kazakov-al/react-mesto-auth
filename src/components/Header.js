import { useState, useContext } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from "../images/logo.svg";

function Header(props) {
  const { onSignOut } = props;

  const { loggedIn, userEmail } = useContext(AuthContext);
  const [ isMenuOpen, setMenuOpen ] = useState(false);

  const headerLink = (
    <Switch>
      <Route path="/sign-in">
        <Link to="/sign-up" className="link header__link">Регистрация</Link>
      </Route>
      <Route path="/sign-up">
        <Link to="/sign-in" className="link header__link">Войти</Link>
      </Route>
    </Switch>
  );

  function openMenu() {
    setMenuOpen(!isMenuOpen);
    console.log('12')
  }

  function handleSignOutClick() {
    setMenuOpen(false);
    console.log(onSignOut)
    onSignOut();
  }

  const userLogout = (
    <div className={`header__info ${isMenuOpen ? 'header__info_show' : ''}`}>
      <p className="header__user-email">{userEmail}</p>
      <button className="header__logout-btn" onClick={handleSignOutClick}>Выйти</button>
    </div>
  );

  return (
    <header className="header">
      { loggedIn ? userLogout : headerLink }

      <div className="">
        <Link to="/">
          <img
            className="header__logo"
            src={logo}
            alt="Логотип проекта «Mesto»"
          />
        </Link>

        { loggedIn && <button className="header__menu-button" onClick={openMenu}>123</button> }
      </div>
    </header>
  );
}

export default Header;
