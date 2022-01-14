import { totalLevelsInGame, BEST_SCORE } from '../constants';

export const ACTION_TYPES = {
  DO_OPERATION: 'DO_OPERATION',
};

const getBestScore = () => {
  const bestScore = localStorage.getItem(BEST_SCORE);
  if (bestScore === null || bestScore === undefined) localStorage.setItem(BEST_SCORE, 0);
  return bestScore || 0;
};
export const INITIAL_STATE = {
  currentLevel: 1,
  bestScore: getBestScore(),
  currentScore: 0,
  energy: 0,
  isCurrentLevelCompleted: false,
  clicks: 0,
  time: -1,
  allImages: [],
  totalLevels: totalLevelsInGame,
  levelFailed: false,
  restartGame: false,
  currentLevelsTrack: 0
};

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.DO_OPERATION: {
      return { ...state, ...payload };
    }

    default: {
      return { ...state };
    }
  }
};