import './style.css';

import { GAME_STATE, centerX, centerY, eventName } from './constant';
import React, { useEffect, useRef, useState } from 'react';

import Bullet from './components/Bullet';
import Egg from './components/Egg';
import Enemy from './components/Enemy';
// eslint-disable-next-line no-unused-vars
import GameObject from './components/GameObject';
import Player from './components/Player';
import eggImg from './assets/egg.png';
import pikoAttackImg from './assets/piko_2.png';
import pikoSusImg from './assets/piko_1.png';
import topedAttackImg from './assets/toped_2.png';
import topedExcitedImg from './assets/toped_4.png';
import topedHurtImg from './assets/toped_3.png';
import topedIdleImg from './assets/toped_1.png';

const ProtectEggGame = () => {
  const canvasRef = useRef(null);
  const requestAnimFrameRef = useRef(null);
  const [showUI, setShowUI] = useState(true);
  const [isGameover, setIsGameover] = useState(false);
  const [buttonText, setButtonText] = useState('Mulai berjaga!');

  /** @type {HTMLCanvasElement} */
  let canvas;
  /** @type {CanvasRenderingContext2D}*/
  let ctx;
  /** @type {GameObject[]} */
  const gameObjects = [];

  let timePassed = 0;
  let prevTimeStamp = 0;
  let fps = 0;

  /** @type {Map<string, Image>} */
  const imageManager = new Map();

  let gameState = GAME_STATE.PREPARE;
  let gameScore = 0;
  const tickPerSecond = 1.25;
  let tick = 1;

  console.log('ga', gameState, showUI);

  let justPressSpace = false;
  const tickAddEvent = new Event(eventName.tickAdd);

  /** @type {Player}*/
  let player;
  /** @type {Egg}*/
  let egg;

  const start = () => {
    player = new Player(ctx, centerX, centerY, 16);
    player.setTag('player');

    egg = new Egg(ctx, centerX, centerY, 16);
    egg.setTag('egg').setData('life', 1);

    const playerShoot = () => {
      player.setSprite(imageManager.get('toped-attack'));

      const dx = player.x - egg.x;
      const dy = player.y - egg.y;

      const findBullet = go => go.tag === 'bullet' && !go.getData('active'); 
      if (gameObjects.some(findBullet)) {
        /** @type {Bullet} */
        const reuseBullet = gameObjects.find(findBullet);
        reuseBullet.x = player.x;
        reuseBullet.y = player.y;
        reuseBullet.shoot(dx, dy);
        return;
      }

      const bullet = new Bullet(ctx, centerX, centerY, 6);
      bullet.setColor('yellow').setTag('bullet');
      bullet.setData('active', true).setData('speed', 15);

      bullet.x = player.x;
      bullet.y = player.y;
      bullet.shoot(dx, dy);
      gameObjects.push(bullet);
    };

    //#region Enemy
    window.addEventListener(eventName.tickAdd, () => {
      const generatePosition = () => {
        const pos = { x: 0, y: 0 };

        const spawnDir = 1 + Math.round(Math.random() * 3); // 1..4
        switch (spawnDir) {
        case 1: // Top
          pos.x = Math.round(Math.random() * 500); // 0..500
          pos.y = Math.round(Math.random() * -150);
          break;
        case 2: // Right
          pos.x = 500 + Math.round(Math.random() * 150);
          pos.y = Math.round(Math.random() * 500);
          break;
        case 3: // Bot
          pos.x = Math.round(Math.random() * 500);
          pos.y = 500 + Math.round(Math.random() * 150); // 500..600
          break;
        case 4: // Left
          pos.x = Math.round(Math.random() * -150); // -100..0
          pos.y = Math.round(Math.random() * 500);
          break;
        default:
        }
        return pos;
      };

      const findEnemy = go => go.tag === 'enemy' && !go.getData('active'); 
      if (gameObjects.some(findEnemy)) {
        /** @type {Enemy} */
        const reuseEnemy = gameObjects.find(findEnemy);
        const pos = generatePosition();
        reuseEnemy.x = pos.x;
        reuseEnemy.y = pos.y;
        reuseEnemy.visible = true;
        const randomSprite = Math.random() > 0.65 ? imageManager.get('piko-sus') : imageManager.get('piko-attack')
        reuseEnemy.setData('active', true).setSprite(randomSprite);

        const dxPlayer = player.x - reuseEnemy.x;
        const dyPlayer = player.y - reuseEnemy.y;
        reuseEnemy.setVelocity(
          dxPlayer * reuseEnemy.getData('speed'),
          dyPlayer * reuseEnemy.getData('speed')
        );
        return;
      }

      const pos = generatePosition();
      const enemy = new Enemy(ctx, pos.x, pos.y, 21);
      enemy.setTag('enemy').setData('active', true);
      enemy.setData('speed', 0.35).setSprite(imageManager.get('piko-sus'));

      const dxPlayer = player.x - pos.x;
      const dyPlayer = player.y - pos.y;
      enemy.setVelocity(
        dxPlayer * enemy.getData('speed'),
        dyPlayer * enemy.getData('speed')
      );

      gameObjects.push(enemy);
    }, false);
    //#endregion

    //#region Player Action
    let clickTimeoutID = null;
    canvas.addEventListener('click', () => {
      if (gameState !== GAME_STATE.PLAY) return;

      clearTimeout(clickTimeoutID);
      clickTimeoutID = setTimeout(() => player.setSprite(imageManager.get('toped-idle')), 500);

      playerShoot();
    });

    window.addEventListener("keydown", e => {
      if (gameState !== GAME_STATE.PLAY) return;

      if (e.code === 'Space') {
        if (!justPressSpace) {
          playerShoot();
          justPressSpace = true;
        }
      }
    });

    window.addEventListener("keyup", e => {
      if (e.code === 'Space') {
        player.setSprite(imageManager.get('toped-idle'));
        justPressSpace = false;
      }
    });
    //#endregion

    gameObjects.push(...[
      player,
      egg,
    ]);
  };

  const preload = () => {
    const assets = [
      { key: 'toped-idle', val: topedIdleImg },
      { key: 'toped-attack', val: topedAttackImg },
      { key: 'toped-hurt', val: topedHurtImg },
      { key: 'toped-excited', val: topedExcitedImg },
      { key: 'piko-sus', val: pikoSusImg },
      { key: 'piko-attack', val: pikoAttackImg },
      { key: 'egg', val: eggImg },
    ];
    assets.forEach(data => {
      const img = new Image();
      img.src = data.val;
      imageManager.set(data.key, img);
    });

    player.setSprite(imageManager.get('toped-idle'));
    egg.setSprite(imageManager.get('egg'));
  };

  const initialize = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');

    start();
    preload();
  };

  const update = (deltaTime) => {
    if (gameState !== GAME_STATE.PLAY) return;

    if (tick <= 0) {
      tick += tickPerSecond * (Math.random() * 2);
      window.dispatchEvent(tickAddEvent);
    }
    tick -= deltaTime;

    // Gameover handler
    if (egg.getData('life') <= 0) {
      gameState = GAME_STATE.GAMEOVER;
      setShowUI(true);
      setIsGameover(true);
      setButtonText('Yah! Semua telur hilang :(');
    }

    gameObjects.forEach(go => {
      go.update(deltaTime);
    });
  };

  const render = (deltaTime) => {
    gameObjects.forEach(go => go.render(deltaTime));
  };

  const circleIntersect = (x1, y1, r1, x2, y2, r2) => {
    let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
    return squareDistance <= ((r1 + r2) * (r1 + r2))
  }

  const detectCollision = () => {
    /** @type {GameObject}*/
    let goA;
    /** @type {GameObject}*/
    let goB;

    gameObjects.forEach((go, i) => {
      go.isColliding = false;

      goA = go;
      for (let j = i + 1; j < gameObjects.length; j++) {
        goB = gameObjects[j];

        if ((goA.tag === 'egg' || goB.tag === 'egg') && circleIntersect(goA.x, goA.y, goA.radius, goB.x, goB.y, goB.radius)) {
          if (goA.tag === 'bullet') {
            goA.visible = false;
            goA.setData('active', false);
          } else if (goB.visible) {
            goB.visible = false;
            goB.setData('active', false);

            const eggLeft = egg.getData('life');
            const eggCurr = eggLeft - 1;
            if (eggCurr >= 0) {
              egg.setData('life', eggCurr);
            }
            console.log(eggCurr);
          }
        }

        if (goA?.visible && goB?.visible && circleIntersect(goA.x, goA.y, goA.radius, goB.x, goB.y, goB.radius)) {
          goA.isColliding = true;
          goB.isColliding = true;

          if ((goA.tag === 'player' && goB.tag === 'enemy') || (goA.tag === 'enemy' && goB.tag === 'player')) {
            player.setSprite(imageManager.get('toped-hurt'));
          }

          if ((goA.tag === 'bullet' && goB.tag === 'enemy') || (goA.tag === 'enemy' && goB.tag === 'bullet')) {
            goA.visible = false;
            goB.visible = false;
            gameScore += 1;
          }

          if ((goA.tag === 'enemy' && goB.tag === 'egg') || (goA.tag === 'egg' && goB.tag === 'enemy')) {
            if (goA.tag === 'enemy') {
              goA.visible = false;
            } else {
              goB.visible = false;
            }
          }
        }
      }
    });
  }

  const gameLoop = (timeStamp) => {
    timePassed = (timeStamp - prevTimeStamp) / 1000;
    timePassed = Math.min(timePassed, 0.1); // Correction limit
    prevTimeStamp = timeStamp;

    fps = Math.round(1 / timePassed);

    update(timePassed);
    detectCollision();

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#3498db';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    render(timePassed);

    // Draw FPS
    ctx.fillStyle = 'black';
    ctx.textAlign = 'end';
    ctx.font = '16px Arial';
    ctx.textBaseline = 'top';
    ctx.fillText("FPS: " + fps.toString(), canvas.width - 16, 8);

    // Draw Tut
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = '18px Arial';
    ctx.textBaseline = 'bottom';
    ctx.fillText('Use ArrowLeft - ArrowRight or A - D to Move', centerX, canvas.height - 32);
    ctx.fillText('Use Space or Click to Shoot', centerX, canvas.height - 8);

    // Score
    ctx.font = '18px Arial';
    ctx.fillText('SCORE', centerX, 32);

    ctx.font = '32px Arial';
    ctx.textBaseline = 'top';
    ctx.fillText(gameScore, centerX, 38);


    requestAnimFrameRef.current = requestAnimationFrame(gameLoop);
  }

  const handleClickPlay = () => {
    if (isGameover) {
      window.location.reload();
      return;
    }
    setShowUI(false);
    gameState = GAME_STATE.PLAY;
    player.setSprite(imageManager.get('toped-excited'));
  };

  useEffect(() => {
    initialize();
    requestAnimFrameRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestAnimFrameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="protectEggGameWrapper">
      <canvas id="game-canvas" ref={canvasRef} width={512} height={512} />
      <div className="ui">
        {
          showUI && <button className={`playBtn${isGameover ? ' lose' : ''}`} onClick={handleClickPlay}>{buttonText}</button>
        }
      </div>
    </div>
  )
}

export default ProtectEggGame;
