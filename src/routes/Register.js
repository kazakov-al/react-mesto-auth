import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const { onRegister } = props;

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      onRegister(email, password);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  }

  return (
    <form className="form form_place_authorization" noValidate onSubmit={handleSubmit}>
      <h2 className="form__title form__title_place_authorization">Регистрация</h2>
      <label className="form__item form__item_place_authorization">
        <input
          className="form__field form__field_color_white"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__field-error"></span>
      </label>
      <label className="form__item form__item_place_authorization">
        <input
          className="form__field form__field_color_white"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__field-error"></span>
      </label>
      <button className="button button_color_white form__submit form__submit_place_authorization">Зарегистрироваться</button>
      <p className="form__action">Уже зарегистрированы? <Link className="link" to="/sign-in">Войти</Link></p>
    </form>
  );
}

export default Register;
