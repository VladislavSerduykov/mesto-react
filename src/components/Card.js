import React from "react";

function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="gallery__element">
      <img
        className="gallery__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="gallery__description">
        <h2 className="gallery__caption">{props.card.name}</h2>
        <div className="gallery__like-container">
          <button className="gallery__like" type="button"></button>
          <p className="gallery__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button className="gallery__delete" type="button"></button>
    </article>
    )
}
export default Card;