import { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;
  const [ name, setName ] = useState('');
  const [ link, setLink ] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleChange(e) {
    const el = e.target;

    if (el.name === 'place-name') setName(el.value)
    if (el.name === 'place-image') setLink(el.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="place-add"
      title="Новое место"
      buttonText="Создать"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__item">
        <input
          className="form__field"
          type="text"
          name="place-name"
          placeholder="Название"
          value={name || ''}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__field-error" id="error-place-name">Вы пропустили это поле.</span>
      </label>
      <label className="form__item">
        <input
          className="form__field"
          type="url"
          name="place-image"
          placeholder="Ссылка на картинку"
          value={link || ''}
          onChange={handleChange}
          required
        />
        <span className="form__field-error" id="error-place-image"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
