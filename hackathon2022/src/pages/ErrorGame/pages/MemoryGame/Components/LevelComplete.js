import React from 'react';

import { convertSecondsToTime, levels } from '../constants';
import { ACTION_TYPES } from '../reducer';

function LevelComplete({ dispatch, currentLevel, closeModal, clicks, time }) {
  const handleLevels = (playAgain) => {
    dispatch({ 
      type: ACTION_TYPES.DO_OPERATION,
      payload: {
        currentLevel: playAgain ? currentLevel : currentLevel + 1,
        clicks: 0,
        isCurrentLevelCompleted: false,
        time: -1,
        currentLevelsTrack: 0,
        restartGame: true,
      }
    });
    closeModal();
  }

  return (
    <div className='levels'>
      <h1>Congratulation!!</h1>
      <h2>You Win</h2>
      <p>Get {levels[currentLevel + 1].bonus} more energy in next level</p>
      <p>Clicks : {clicks}</p>
      <p>Time: {convertSecondsToTime(time)}</p>
      <button className="button-one btn1" onClick={() => handleLevels(true)}><span>Play Again</span></button>
      <button className="button-one btn2" onClick={() => handleLevels(false)}>Play Next Level</button>
    </div>
  )
}

export default LevelComplete
