import React from "react";

function ToolTipPopup({ message, onClose }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose(e);
  }

  return (
    <div
      className={`popup ` + (message ? "popup_opened" : "")}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <p
          className={
            "popup__info" +
            (message
              ? message.isSuccess
                ? " popup__info_type_success"
                : " popup__info_type_fail"
              : "")
          }
        >
          {message ? message.text : ""}
        </p>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
export default ToolTipPopup;
