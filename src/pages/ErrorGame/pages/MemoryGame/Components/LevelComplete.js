import React from 'react';

import { convertSecondsToTime, levels, totalLevelsInGame } from '../constants';
import { ACTION_TYPES } from '../reducer';

function LevelComplete({ dispatch, currentLevel, closeModal, clicks, time }) {
  const allLevelComplete = totalLevelsInGame === currentLevel;
  const handleLevels = (playAgain) => {
    const toLevel = allLevelComplete ? currentLevel  - 1 : currentLevel + 1;
    dispatch({ 
      type: ACTION_TYPES.DO_OPERATION,
      payload: {
        currentLevel: playAgain || totalLevelsInGame === 1 ? currentLevel : toLevel,
        clicks: 0,
        isCurrentLevelCompleted: false,
        time: -1,
        currentLevelsTrack: 0,
        restartGame: true,
      }
    });
    closeModal();
  }

  const text = allLevelComplete ? 'Play Previous Level' : 'Play Next Level';
  const message = allLevelComplete ? `Play Again to get more rewards` : `Get ${levels[currentLevel + 1].bonus} more energy in next level`

  return (
    <div className='levels'>
      <h1>Congratulation!!</h1>
      <h2>You Win</h2>
      <p>{message}</p>
      <p>Clicks : {clicks}</p>
      {time ? <p>Time: {convertSecondsToTime(time)}</p> : null}
      <button className="button-one btn1" onClick={() => handleLevels(true)}><span>Play Again</span></button>
      <button className="button-one btn2" onClick={() => handleLevels(false)}>{text}</button>
    </div>
  )
}

export default LevelComplete
