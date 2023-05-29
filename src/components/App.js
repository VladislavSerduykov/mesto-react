import "../index.css";
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__input-fields">
          <input
            id="image-input"
            className="popup__text popup__text_value_link"
            type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="image-input-error popup__input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__input-fields">
          <input
            id="name-input"
            className="popup__text popup__text_value_name"
            type="text"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="name-input-error popup__input-error"></span>
        </label>
        <label className="popup__input-fields">
          <input
            id="profession-input"
            className="popup__text popup__text_value_profession"
            type="text"
            name="profession"
            placeholder="Профессия"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="profession-input-error popup__input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="add"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__input-fields">
          <input
            id="place-input"
            className="popup__text popup__text_value_name-place"
            type="text"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="place-input-error popup__input-error"></span>
        </label>
        <label className="popup__input-fields">
          <input
            id="link-input"
            className="popup__text popup__text_value_link"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="link-input-error popup__input-error"></span>
        </label>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
      ></PopupWithForm>
    </div>
  );
}

export default App;
