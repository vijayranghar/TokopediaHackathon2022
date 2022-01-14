export const levels = {
  1: {
    number: 1,
    message: "",
    time: 100000,
    totalClicks: 25,
    totalImages: 4,
    bonus: 10,
    color: "#03AC0E"  // 03AC0E // 519259
  },
  2: {
    number: 2,
    message: "",
    time: 20,
    totalClicks: 20,
    totalImages: 8,
    bonus: 10,
    color: "#c00"
  },
  3: {
    number: 3,
    message: "",
    time: 20,
    totalClicks: 30,
    totalImages: 8,
    bomus: 50,
    color: "#c00"
  },
  4: {
    number: 4,
    message: "",
    time: 30,
    totalClicks: 40,
    totalImages: 8,
    bomus: 100,
    color: "#c00"
  }
};

export const BEST_SCORE = "tkpd_b_s_m";

export const totalLevelsInGame = Object.keys(levels).length;

export const IMAGES = [
  "angular2",
  "vue",
  "react",
  "grunt",
  "phantomjs",
  "ember",
  "babel",
  "ionic",
  "gulp",
  "meteor",
  "yeoman",
  "yarn",
  "nodejs",
  "bower",
  "browserify"
];

export const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
};

export const convertSecondsToTime = (totalSeconds) => {
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  if (hours) {
    return `${hours}:${minutes}:${seconds}`;
  } else if (minutes) {
    return `${minutes}:${seconds}`;
  } else {
    return seconds;
  }
};
