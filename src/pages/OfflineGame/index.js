import React, { useRef, useState, useEffect } from "react";

import Line from "./Line";
import Car from "./Car";
import randomColor from "./helper";
import "./style.css";

const speedIncreasePoint = 1000;
const startScore = 0;
const startSpeed = 5;
const keys = {
  ArrowLeft: false,
  ArrowRight: false,
};
const player = {
  speed: startSpeed,
  score: startScore,
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

    // // Left key
    // document.getElementById("leftBtn").addEventListener("touchstart", (e) => {
    //   e.preventDefault();
    //   keys["ArrowLeft"] = true;
    // });
    // document.getElementById("leftBtn").addEventListener("touchend", (e) => {
    //   e.preventDefault();
    //   keys["ArrowLeft"] = false;
    // });
    // // Right Key
    // document.getElementById("rightBtn").addEventListener("touchstart", (e) => {
    //   e.preventDefault();
    //   keys["ArrowRight"] = true;
    // });
    // document.getElementById("rightBtn").addEventListener("touchend", (e) => {
    //   e.preventDefault();
    //   keys["ArrowRight"] = false;
    // });

    return () => {
      // document.addEventListener("keyup", keyUp);
      // document.addEventListener("keydown", keyDown);
      // document.getElementById("rightBtn").addEventListener("touchstart", (e) => {
      //   e.preventDefault();
      //   keys["ArrowRight"] = true;
      // });
      // document.getElementById("rightBtn").addEventListener("touchend", (e) => {
      //   e.preventDefault();
      //   keys["ArrowRight"] = false;
      // });
    };
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
    const road = gameArea.current.getBoundingClientRect();
    if (state.startGame) {
      moveLines(lineRef);
      moveEnemy(myCarRef.current, enemyCarRef);

      const carDetails = myCarRef.current.getBoundingClientRect();
      console.log("carDetails.left ", carDetails.left);
      if (keys.ArrowLeft && carDetails.left > 0) {
        const left = carDetails.left - player.speed;
        myCarRef.current.style.left = `${left}px`;
        debugger;

        console.log(
          "carDetails.left left ",
          carDetails.left +
            " player.speed " +
            player.speed +
            " myCarRef.current.style.left " +
            myCarRef.current.style.left
        );
      }
      if (keys.ArrowRight && carDetails.left < road.width - 100) {
        myCarRef.current.style.left = carDetails.left + player.speed + "px";
        console.log(
          "carDetails.left right ",
          carDetails.left +
            " player.speed " +
            player.speed +
            " myCarRef.current.style.left " +
            myCarRef.current.style.left
        );
      }
      // car.style.top = player.y + "px";
      // car.style.left = player.x + "px";
      console.log("gamePlay");
      window.requestAnimationFrame(gamePlay);

      // // Score Update
      // player.score++;

      // // speed Update
      // if (player.score % speedIncreasePoint === 0) {
      //   player.speed += 1;
      // }

      // // Dashboard Update
      // const showScore = player.score - 1;
      // const showSpeed = player.speed - 4;
      // score.innerText = "Score: " + showScore;
      // speed.innerText = "Speed: " + showSpeed;
    }
  }

  function start() {
    gameHeight = gameArea.current.offsetHeight;
    gameWidth = gameArea.current.offsetWidth;
    setState({
      ...state,
      startGame: true,
      endGame: false,
    });
  }

  function renderGameDataonStart() {
    window.requestAnimationFrame(gamePlay);
    const line = [];
    let myCar = "";
    const enemyCar = [];

    for (let x = 0; x < 3; x++) {
      line.push(
        <Line
          key={x}
          ref={(element) => lineRef.current.push(element)}
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
      />
    );

    for (let x = 0; x < 3; x++) {
      enemyCar.push(
        <Car
          key={x}
          ref={(element) => enemyCarRef.current.push(element)}
          categry="enemy"
          color={randomColor()}
          y={(x + 1) * 350 * 1 + "px"}
          x={Math.floor(Math.random() * (gameWidth - 50)) + "px"}
        />
      );
    }
    return (
      <>
        {line}
        {myCar}
        {enemyCar}
      </>
    );
  }

  return (
    <div>
      <div className="mainWrapper">
        <div className="dashboard">
          <div className="score" ref={score}></div>
          <div className="speed" ref={speed}></div>
        </div>
        <div className="leftBtn btn" id="leftBtn"></div>
        <div className="rightBtn btn" id="rightBtn"></div>
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
              Press again to restar"
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
