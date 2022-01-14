import React, { useReducer, useEffect, useState } from "react";

import Card from "./Card";
import Modal from "../shared/Modal";

import {
  shuffleArray,
  IMAGES,
  levels,
  totalLevelsInGame,
  BEST_SCORE,
  convertSecondsToTime
} from "../constants";
import { ACTION_TYPES, INITIAL_STATE, reducer } from "../reducer";
import LevelComplete from "./LevelComplete";
import LevelFailed from "./LevelFailed";
import eggImage from '../assets/eggImage3.png';

const PlayGround = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {
    allImages,
    currentScore,
    currentLevel,
    energy,
    clicks,
    isCurrentLevelCompleted,
    time,
    levelFailed,
    restartGame,
    currentLevelsTrack,
    bestScore
  } = state;
  const [openedImages, setOpenedImage] = useState([]);
  const [isModalOpen, setModal] = useState(false);

  const clickTrack = levels[currentLevel].totalClicks;
  const timeTrack = levels[currentLevel].time;

  useEffect(() => {
    if (bestScore < currentScore) {
      dispatch({
        type: ACTION_TYPES.DO_OPERATION,
        payload: { bestScore: currentScore }
      });
      localStorage.setItem(BEST_SCORE, currentScore);
    }
  }, [currentScore, bestScore]);

  useEffect(() => {
    const totalImagesUsed = IMAGES.slice(0, levels[currentLevel].totalImages);
    const duplicateImagesList = totalImagesUsed.concat(totalImagesUsed);
    const shuffledList = shuffleArray(duplicateImagesList);
    const finalizedList = shuffledList.map((name, index) => {
      return {
        name,
        close: false,
        complete: false,
        fail: false
      };
    });
    dispatch({
      type: ACTION_TYPES.DO_OPERATION,
      payload: { allImages: finalizedList, time: timeTrack, restartGame: false }
    });
    setTimeout(() => {
      const finalizedList = shuffledList.map((name, index) => {
        return {
          name,
          close: true,
          complete: false,
          fail: false
        };
      });
      dispatch({ type: ACTION_TYPES.DO_OPERATION, payload: { allImages: finalizedList} });
    }, 1000);
  }, [currentLevel, restartGame, timeTrack]);

  useEffect(() => {
    if (time > 0 && !isCurrentLevelCompleted) {
      const interval = setTimeout(() => {
        dispatch({
          type: ACTION_TYPES.DO_OPERATION,
          payload: { time: time - 1 }
        });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [time, isCurrentLevelCompleted]);

  const handleClick = (name, index) => {
    if (openedImages.length >= 2) {
      return;
    } else {
      const updateOpenedImages = [...openedImages, { name, index }];
      const updatedImages = allImages.map((image, i) => {
        if (index === i) image.close = false;
        return image;
      });
      setOpenedImage(updateOpenedImages);
      dispatch({
        type: ACTION_TYPES.DO_OPERATION,
        payload: { allImages: updatedImages }
      });
    }
  };

  useEffect(() => {
    if (openedImages.length === 2) {
      setTimeout(() => {
        const updatedImages = [...allImages];
        if (
          openedImages[0].name === openedImages[1].name &&
          openedImages[0].index !== openedImages[1].index
        ) {
          updatedImages[openedImages[0].index].complete = true;
          updatedImages[openedImages[1].index].complete = true;
          dispatch({
            type: ACTION_TYPES.DO_OPERATION,
            payload: {
              currentScore: currentScore + currentLevel,
              currentLevelsTrack: currentLevelsTrack + 1
            }
          });
        } else {
          updatedImages[openedImages[0].index].close = true;
          updatedImages[openedImages[1].index].close = true;
        }
        setOpenedImage([]);
        dispatch({
          type: ACTION_TYPES.DO_OPERATION,
          payload: {
            allImages: updatedImages,
            clicks: clicks + 1
          }
        });
      }, 750);
    }
  }, [openedImages]);

  const closeModal = () => {
    setModal(false);
  };

  // update Energy
  useEffect(() => {
    if (
      currentLevelsTrack &&
      (currentLevelsTrack === (allImages.length / 2))
    ) {
      dispatch({
        type: ACTION_TYPES.DO_OPERATION,
        payload: {
          isCurrentLevelCompleted: true,
          energy: energy + levels[currentLevel].bonus,
          currentLevelsTrack: 0
        }
      });
    }
    if (currentScore && (currentScore % 10 === 0)) {
      dispatch({
        type: ACTION_TYPES.DO_OPERATION,
        payload: { energy: energy + 5, currentScore: currentScore + 1 },
      });
    }
  }, [currentLevelsTrack, allImages.length, currentLevel, energy]);

  // On level completion
  useEffect(() => {
    if (isCurrentLevelCompleted && !isModalOpen) setModal(true);
  }, [isCurrentLevelCompleted, isModalOpen]);

  // When number of clicks exceed
  useEffect(() => {
    if (clicks === clickTrack && !isCurrentLevelCompleted) {
      dispatch({
        type: ACTION_TYPES.DO_OPERATION,
        payload: { levelFailed: "click exceed" }
      });
    }
    if (time === 0 && !isCurrentLevelCompleted) {
      dispatch({
        type: ACTION_TYPES.DO_OPERATION,
        payload: { levelFailed: "timeout" }
      });
    }
  }, [clicks, isCurrentLevelCompleted, time, clickTrack]);

  useEffect(() => {
    if (levelFailed && !isModalOpen) setModal(true);
  }, [levelFailed, isModalOpen]);

  return (
    <div
      className="container"
      style={{ background: `${levels[currentLevel].color}` }}
    >
      <header className="header">
        <h1>Memory Game</h1>
      </header>
      <section className="user-score-data">
        <div className="box">
          <p>
            Level: {currentLevel}/{totalLevelsInGame}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p>Energy: {energy}</p>
            <img src={eggImage} id="eggImage" />
          </div>
        </div>
        <div className="box">
          {timeTrack ? <p>Time {convertSecondsToTime(time)}</p> : null}
          {clickTrack ? (
            <p>
              Flips: {clicks} / {clickTrack}
            </p>
          ) : null}
        </div>
        <div className="box">
          <p>Current Score: {currentScore}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </section>
      <div id="app">
        <div className="playground">
          {allImages.map((framework, index) => {
            return (
              <Card
                framework={framework.name}
                click={() => {
                  handleClick(framework.name, index);
                }}
                close={framework.close}
                complete={framework.complete}
              />
            );
          })}
        </div>
        <div></div>
      </div>
      {isCurrentLevelCompleted ? (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <LevelComplete
            dispatch={dispatch}
            currentLevel={currentLevel}
            clicks={clicks}
            time={timeTrack - time}
            closeModal={closeModal}
          />
        </Modal>
      ) : null}
      {levelFailed ? (
        <Modal>
          <LevelFailed
            currentLevel={currentLevel}
            dispatch={dispatch}
            clicks={clicks}
            time={timeTrack - time}
            levelFailed={levelFailed}
            closeModal={closeModal}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default PlayGround;
