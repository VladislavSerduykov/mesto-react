import React from "react";

function ImagePopup(props) {
  return (
    <div class={`popup popup_value_image` + (props.card !== null && " popup_opened")}>
      <figure class="popup__scale-container">
        <button class="popup__close" type="button" onClick={props.onClose}></button>
        <img class="popup__image" src={props.card !== null ? props.card.link : "#"} alt={props.card !== null ? props.card.name : "#"} />
        <figcaption class="popup__image-caption">{props.card !== null ? props.card.name : "#"}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
