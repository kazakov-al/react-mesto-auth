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

  const headerMenu = (
    <div className={`header-menu ${isMenuOpen ? 'header-menu_show' : ''}`}>
      <p className="header-menu__user-email">{userEmail}</p>
      <button className="header-menu__logout-button" onClick={handleSignOutClick}>Выйти</button>
    </div>
  );

  function openMenu() {
    setMenuOpen(!isMenuOpen);
  }

  function handleSignOutClick() {
    setMenuOpen(false);
    onSignOut();
  }

  return (
    <header className="header">
      { loggedIn && headerMenu }

      <div className="header__content">
        <Link className="header__logo" to="/">
          <img
            className="header__logo-img"
            src={logo}
            alt="Логотип проекта «Mesto»"
          />
        </Link>
        { !loggedIn && headerLink }
        { loggedIn && <button className={`header__menu-button ${isMenuOpen ? 'header__menu-button_close' : ''}`} onClick={openMenu} /> }
      </div>
    </header>
  );
}

export default Header;
