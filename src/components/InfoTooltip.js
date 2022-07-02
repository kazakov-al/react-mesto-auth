function InfoTooltip({ isOpen, onClose, isRequestCompleted }) {
  const statusIcon = isRequestCompleted ? 'popup__status-icon_type_success' : 'popup__status-icon_type_defeat';
  const statusText = isRequestCompleted ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'

  return (
    <section
      className={`popup popup_backdrop_black ${isOpen ? 'popup_is-opened' : ''}`}
      role="dialog"
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрыть окно"
          type="button"
          onClick={onClose}
        >
        </button>

        <div className="popup__content popup__content_place_infotooltip">
          <div className={`popup__status-icon ${statusIcon}`} />
          <p className="popup__text popup__text_place_infotooltip">{statusText}</p>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
