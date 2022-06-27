import { useState, useContext, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;
  const currentUser = useContext(CurrentUserContext);

  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  function handleChange(e) {
    const el = e.target;

    if (el.name === 'user-nickname') {
      setName(el.value);
    }

    if (el.name === 'user-description') {
      setDescription(el.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="user-info-edit"
      title="Редактировать профиль"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__item">
        <input
          className="form__field"
          type="text"
          name="user-nickname"
          value={name || ''}
          onChange={handleChange}
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__field-error" id="error-user-nickname"></span>
      </label>
      <label className="form__item">
        <input
          className="form__field"
          type="text"
          name="user-description"
          value={description || ''}
          onChange={handleChange}
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__field-error" id="error-user-description"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
