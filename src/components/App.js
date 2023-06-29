import "../index.css";
import React from "react";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup ";
import ConfirmPopup from "./ConfirmPopup";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ToolTipPopup from "./ToolTipPopup";
import auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [deletedCard, setDeletedCard] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [infoMessage, setInfoMessage] = React.useState(null);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));

    api
      .getCardList()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

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
  function handleCardDelete(card) {
    setDeletedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .toggleLikes(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleConfirmCardDelete(card) {
    const cardId = deletedCard._id;

    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateUser(userInfo) {
    api

      .changeUserInfo(userInfo)
      .then((updateUserInfo) => {
        setCurrentUser(updateUserInfo);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar({ avatar }) {
    api

      .setUserImage(avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlace(newPlace) {
    api

      .addNewCard(newPlace)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch(console.error);
  }
  // Авторизация
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch(console.error);
    }
  }, [navigate]);

  function handleInfoMessage(message) {
    setInfoMessage(message);
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
    setInfoMessage(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  email={email}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleInfoMessage={handleInfoMessage}
                onLogin={handleLogin}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register handleInfoMessage={handleInfoMessage} />}
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/"/> : <Navigate to="/sign-up"/>
            }
          />
        </Routes>

        <Footer />

        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <ToolTipPopup onClose={closeAllPopups} message={infoMessage} />

        <ConfirmPopup
          isOpen={!!deletedCard}
          onClose={closeAllPopups}
          onConfirm={handleConfirmCardDelete}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
