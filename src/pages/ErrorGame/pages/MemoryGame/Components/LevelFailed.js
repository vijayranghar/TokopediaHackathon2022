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
    <div className='levels'>
      <h1>Game Over</h1>
      <p>Play again to get more energy and rewards</p>
      {time ? <p>Time: {convertSecondsToTime(time)}</p> : null}
      <button className="button-one btn1" onClick={() => handleLevels(true)}>Play previous Level</button>
      <button className="button-one btn2" onClick={() => handleLevels(false)}>Play Again</button>
    </div>
  )
}

export default LevelFailed
