import React, { useRef, useState, useEffect } from "react";

import Line from "./Line";
import Car from "./Car";
import randomColor from "./helper";
import "./style.css";

const speedIncreasePoint = 2000;
const startScore = 0;
const startSpeed = 5;
const keys = {
  ArrowLeft: false,
  ArrowRight: false,
};
const player = {
  speed: startSpeed,
  score: startScore,
  x: 0,
  y: 0,
};

let gameHeight = 0;
let gameWidth = 0;

function OfflineGame() {
  const score = useRef(null);
  const speed = useRef(null);
  const gameArea = useRef(null);
  const lineRef = useRef(new Array(0));
  const myCarRef = useRef(null);
  const enemyCarRef = useRef(new Array(0));

  const [state, setState] = useState({
    startGame: false,
    endGame: false,
  });
  useEffect(() => {
    document.addEventListener("keyup", keyUp);
    document.addEventListener("keydown", keyDown);
  }, []);

  function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
  }
  function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
  }

  function moveLines(dataRef) {
    dataRef.current.forEach(function (item) {
      if (!item) return;
      const data = item.getBoundingClientRect();
      let top = 0;
      if (data.top >= gameHeight) {
        top = -(gameHeight + 100);
      } else {
        top = data.top + player.speed;
      }
      item.style.top = top + "px";
    });
  }

  const isCollide = (a, b) => {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    return !(
      aRect.bottom < bRect.top ||
      aRect.top > bRect.bottom ||
      aRect.right < bRect.left ||
      aRect.left > bRect.right
    );
  };

  function endGame() {
    setState({
      ...state,
      startGame: false,
      endGame: true,
    });
  }

  function moveEnemy(myCarRef, enemyCarRef) {
    enemyCarRef.current.forEach(function (item) {
      if (!item) return;
      const data = item.getBoundingClientRect();
      if (isCollide(myCarRef, item)) {
        endGame();
      }
      if (data.top >= gameHeight) {
        item.style.top = -300 + "px";
        item.style.left = Math.floor(Math.random() * (gameWidth - 50)) + "px";
      } else {
        item.style.top = data.top + player.speed + "px";
      }
    });
  }

  function gamePlay() {
    const car = document.querySelector(".car");
    if (state.startGame && car) {
      moveLines(lineRef);
      moveEnemy(myCarRef.current, enemyCarRef);

      const road = gameArea.current.getBoundingClientRect();
      if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
      }
      if (keys.ArrowRight && player.x < road.width - 50) {
        player.x += player.speed;
      }
      car.style.left = player.x + "px";
      // Score Update
      player.score++;

      // // speed Update
      if (player.score % speedIncreasePoint === 0) {
        player.speed += 1;
      }

      // // Dashboard Update
      const showScore = player.score - 1;
      const showSpeed = player.speed * 10;
      score.current.innerText = "Score: " + showScore;
      speed.current.innerText = `Speed: ${showSpeed}km`;
      window.requestAnimationFrame(gamePlay);
    }
  }

  function start() {
    gameHeight = gameArea.current.offsetHeight;
    gameWidth = gameArea.current.offsetWidth;
    player.speed = startSpeed;
    player.score = startScore;
    player.x = Math.floor(gameArea.current.offsetWidth / 2);
    player.y = Math.floor(gameArea.current.offsetHeight - 200);

    setState({
      ...state,
      startGame: true,
      endGame: false,
    });
  }

  const renderGameDataonStart = () => {
    const line = [];
    let myCar = "";
    const enemyCar = [];

    for (let x = 0; x < 3; x++) {
      line.push(
        <Line
          key={x}
          ref={(element) => (lineRef.current[x] = element)}
          top={`${x * 350}px`}
        />
      );
    }

    myCar = (
      <Car
        ref={myCarRef}
        categry="car"
        color={randomColor()}
        x={Math.floor(gameArea.current.offsetWidth / 2)}
        y={Math.floor(gameArea.current.offsetHeight - 200)}
      />
    );

    for (let x = 0; x < 3; x++) {
      enemyCar.push(
        <Car
          key={x}
          ref={(element) => (enemyCarRef.current[x] = element)}
          categry="enemy"
          color={randomColor()}
          y={(x + 1) * 350 * -1 + "px"}
          x={Math.floor(Math.random() * (gameWidth - 50)) + "px"}
        />
      );
    }
    window.requestAnimationFrame(gamePlay);
    return (
      <>
        {line}
        {myCar}
        {enemyCar}
      </>
    );
  };

  return (
    <div>
      <div className="mainWrapper">
        <div className="dashboard">
          <div className="score" ref={score}></div>
          <div className="speed" ref={speed}></div>
        </div>
        <div
          className="leftBtn btn"
          onTouchStart={() => {
            keys["ArrowLeft"] = true;
          }}
          onTouchEnd={() => {
            keys["ArrowLeft"] = false;
          }}
        ></div>
        <div
          className="rightBtn btn"
          onTouchStart={() => {
            keys["ArrowRight"] = true;
          }}
          onTouchEnd={() => {
            keys["ArrowRight"] = false;
          }}
        ></div>
        {!state.startGame && (
          <div className="startScreen" onClick={start}>
            <p>
              Press here to start
              <br />
              If you hit you loose the game...
            </p>
          </div>
        )}
        {state.endGame && (
          <div className="startScreen" onClick={start}>
            <p>
              Game Over
              <br /> Final score: {player.score}
              <br />
              Press again to restart"
            </p>
          </div>
        )}
        <div className="gameArea" ref={gameArea}>
          {state.startGame && renderGameDataonStart()}
        </div>
      </div>
    </div>
  );
}

export default OfflineGame;
