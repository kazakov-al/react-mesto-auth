import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } =props;
  const inputAvatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="avatar-edit"
      title="Обновить аватар"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__item">
        <input
          className="form__field"
          ref={inputAvatarRef}
          type="url"
          name="avatar-image"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__field-error" id="error-avatar-image"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
