import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../routes/Index';
import Register from '../routes/Register';
import Login from '../routes/Login';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [ currentUser, setCurrentUser ] = useState({});
  const [ isEditProfilePopupOpen, setEditProfilePopupOpen ] = useState(false);
  const [ isEditAvatarPopupOpen, setEditAvatarPopupOpen ] = useState(false);
  const [ isAddPlacePopupOpen, setAddPlacePopupOpen ] = useState(false);
  const [ cards, setCards ] = useState([]);
  const [ selectedCard, setSelectedCard ] = useState({});
  const [ loggedIn, setloggedIn ] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getProfile(),
      api.getInitialCards()
    ])
      .then(([data, cards]) => {
        setCards(cards);
        setCurrentUser(data);
      })
      .catch(console.error);
  }, []);

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

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <main className="content">
          <Switch>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login />
            </Route>
            <ProtectedRoute

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
          isOpen={true}
          onClose={closeAllPopups}
          isRequestCompleted={false}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
