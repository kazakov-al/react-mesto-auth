import { useState, useEffect } from 'react';
import { Route, Switch, Link, Redirect, useHistory } from 'react-router-dom';
import Index from '../routes/Index';
import Register from '../routes/Register';
import Login from '../routes/Login';
import PageNotFound from '../routes/PageNotFound';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import api from "../utils/api";
import auth from "../utils/auth";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AuthContext } from '../contexts/AuthContext';

function App() {
  const history = useHistory();
  const [ currentUser, setCurrentUser ] = useState({});
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ userEmail, setUserEmail ] = useState('ва@fgfg.ru');
  const [ cards, setCards ] = useState([]);
  const [ selectedCard, setSelectedCard ] = useState({});
  const [ isRequestCompleted, setRequestCompleted ] = useState(false);
  const [ isEditProfilePopupOpen, setEditProfilePopupOpen ] = useState(false);
  const [ isEditAvatarPopupOpen, setEditAvatarPopupOpen ] = useState(false);
  const [ isAddPlacePopupOpen, setAddPlacePopupOpen ] = useState(false);
  const [ isTooltipPopupOpen, setTooltipPopupOpen ] = useState(false);

  useEffect(() => {
    handleTokenCheck();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getProfile(),
        api.getInitialCards()
      ])
        .then(([data, cards]) => {
          setCards(cards);
          setCurrentUser(data);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api.editProfile(name, about)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar({avatar}) {
    api.editAvatar(avatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    (isLiked ? api.deleteLike(card._id) : api.addLike(card._id))
      .then(data => {
        setCards((state) => state.map(currentCard => currentCard._id === card._id ? data : currentCard));
      })
      .catch(console.error);
  }

  function handleDeleteClick(card) {
    api.deleteCard(card)
      .then(() => {
        setCards(state => state.filter(currentCard => currentCard._id !== card));
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleLoginSubmit(email, password) {
    auth.authorize(email, password)
      .then(res => {
        if (res.token) {
          setLoggedIn(true);
          setUserEmail(email);
          history.push('/');
        }
      })
      .catch(() => {
        setRequestCompleted(false);
        setTooltipPopupOpen(true);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth.register(email, password)
      .then(res => {
        if (res.statusCode !== '400') {
          setRequestCompleted(true);
          setTooltipPopupOpen(true);
          setTimeout(() => {
            setTooltipPopupOpen(false);
            handleLoginSubmit(email, password);
          }, 3000);

        }
      })
      .catch(() => {
        setRequestCompleted(false);
        setTooltipPopupOpen(true);
      });
  }

  function handleSignOutClick() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then(data => {
          if (data.email) {
            setUserEmail(data.email);
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch(console.error);
    }
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setTooltipPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AuthContext.Provider value={{ loggedIn: loggedIn, userEmail: userEmail }}>
        <div className="page">
          <Header onSignOut={handleSignOutClick} />

          <main className="content">
            <Link to="/sign-up"></Link>
            <Switch>
              <ProtectedRoute
                exact
                path="/"
                loggedIn={loggedIn}
                component={Index}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleLikeClick}
                onCardDelete={handleDeleteClick}
              />

              <Route path="/sign-up">
                <Register onRegister={handleRegisterSubmit} />
              </Route>

              <Route path="/sign-in">
                <Login onLogin={handleLoginSubmit} />
              </Route>

              <Route>
                <Redirect to={`${loggedIn ? '/' : '/sign-in'}`} />
              </Route>

              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
          </main>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          {/*<PopupWithForm*/}
          {/*  isOpen={isEditProfilePopupOpen}*/}
          {/*  name="place-delete"*/}
          {/*  title="Вы уверены?"*/}
          {/*  buttonText="Да"*/}
          {/*  onClose={closeAllPopups}*/}
          {/*>*/}
          {/*</PopupWithForm>*/}

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            isRequestCompleted={isRequestCompleted}
          />
        </div>
      </AuthContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
