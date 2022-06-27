function PopupWithForm(props, { buttonText="Сохранить" }) {
  const { isOpen, onClose, name, onSubmit, title, children } = props;

  return (
    <section
      className={`popup ${isOpen ? 'popup_is-opened' : ''}`}
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

        <form className="form" name={`${name}-form`} action="" method="POST" noValidate onSubmit={onSubmit}>
          <h2 className="form__title">
            { title }
          </h2>

          { children }

          <button className="form__submit">{ buttonText }</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
