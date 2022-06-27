import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <li className="places__item">
      <article className="place">
        {isOwn && <button className='place__remove-button' onClick={handleDeleteClick} aria-label="Удалить место" />}

        <img
          className="place__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
          <div className="place__info">
            <h2 className="place__name">{card.name}</h2>
            <button
              className={`place__like-button ${isLiked ? 'place__like-button_active' : ''}`}
              onClick={handleLikeClick}
              aria-label="Нравится"
            >
              <span className="place__like-count">{card.likes.length}</span>
            </button>
          </div>
      </article>
    </li>
  );
}

export default Card;
