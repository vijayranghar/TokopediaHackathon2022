import React from "react";

const Card = ({ click, close, complete, framework }) => {
  const clicked = (framework) => {
    if (close) click(framework);
  };

  return (
    <div
      className={
        "card" + (!close ? " opened" : "") + (complete ? " matched" : "")
      }
      onClick={() => clicked(framework)}
    >
      <div className="front">?</div>
      <div className="back">
        <img
          alt="img"
          src={
            "https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/" +
            framework +
            ".png"
          }
        />
      </div>
    </div>
  );
};

export default Card;
