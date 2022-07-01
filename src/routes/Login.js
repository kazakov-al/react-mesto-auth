function Login(onLogin) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="form form_place_authorization" noValidate onSubmit={handleSubmit}>
      <h2 className="form__title form__title_place_authorization">Вход</h2>
      <label className="form__item form__item_place_authorization">
        <input
          className="form__field form__field_color_white"
          name="email"
          type="email"
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
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__field-error"></span>
      </label>
      <button className="button button_color_white form__submit form__submit_place_authorization">Войти</button>
    </form>
  );
}

export default Login;
