function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_backdrop_black popup_type_image ${card._id && 'popup_is-opened'}`}
      role="dialog"
    >
      <div className="popup__container popup__container_width_auto">
        <button
          className="popup__close-button"
          aria-label="Закрыть окно"
          type="button"
          onClick={onClose}
        >
        </button>

        <figure className="popup__figure">
          <img
            className="popup__image"
            src={`${card.link}`}
            alt={`${card.name}.`}
          />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
