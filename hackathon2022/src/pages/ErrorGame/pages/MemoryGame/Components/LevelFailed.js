import React from 'react'
import { ACTION_TYPES } from '../reducer';
import { convertSecondsToTime } from '../constants';

function LevelFailed({ dispatch, LevelFailed, closeModal, currentLevel, clicks, time }) {
  // show message on levelFailed
  const handleLevels = (prevLevel) => {
    dispatch({ 
      type: ACTION_TYPES.DO_OPERATION,
      payload: {
        clicks: 0,
        time: -1,
        currentLevel: prevLevel && currentLevel > 1 ? currentLevel - 1 : currentLevel,
        levelFailed: false,
        restartGame: true,
        currentLevelsTrack: 0
      }
    });
    closeModal();
  };
  return (
    <div>
      <h1>Game Over</h1>
      <p>Play again to get more energy and rewards</p>
      <p>Clicks : {clicks}</p>
      <p>Time: {convertSecondsToTime(time)}</p>
      <button onClick={() => handleLevels(true)}>Play previous Level</button>
      <button onClick={() => handleLevels(false)}>Play Again</button>
    </div>
  )
}

export default LevelFailed