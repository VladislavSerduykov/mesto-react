import React from "react";
import api from "../utils/api";
import Card from "./Card";


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState("#");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserAvatar(res.avatar);
        setUserDescription(res.about);
        setUserName(res.name);
      })
      .catch((err) => console.log(err));

      api.getCardList().then((res) => {
        setCards(res);
        console.log(res);
      });
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__image" src={userAvatar} alt="Фото профиля" />
          <button
            className="profile__avatarbtn"
            onClick={onEditAvatar}
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__info-name">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit"
              onClick={onEditProfile}
              type="button"
            ></button>
          </div>
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button
          className="profile__add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="gallery">
        {cards.map((card) => (
          <Card 
          card={card} 
          key={card._id} 
          onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
