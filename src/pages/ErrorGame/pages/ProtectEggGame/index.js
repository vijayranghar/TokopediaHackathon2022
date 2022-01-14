import './style.css';

import React, { useEffect, useRef } from 'react';
import { centerX, centerY } from './constant';

import Egg from './components/Egg';
// eslint-disable-next-line no-unused-vars
import GameObject from './components/GameObject';
import Player from './components/Player';
import eggImg from './assets/egg.png';
import pikoIdleImg from './assets/piko_1.png';
import pikoSusImg from './assets/piko_2.png';
import topedAttackImg from './assets/toped_2.png';
import topedHurtImg from './assets/toped_3.png';
import topedIdleImg from './assets/toped_1.png';

const ProtectEggGame = () => {
  const canvasRef = useRef(null);
  const requestAnimFrameRef = useRef(null);

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

  /** @type {number}*/
  let gameScore = 0;
  /** @type {number}*/
  const tickPerSecond = 1.25;
  /** @type {number}*/
  let tick = 1;

  /** @type {Player}*/
  let player;
  /** @type {Egg}*/
  let egg;

  const start = () => {
    player = new Player(ctx, centerX, centerY, 16);
    player.setTag('player');

    egg = new Egg(ctx, centerX, centerY, 16);
    egg.setTag('egg');

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
      { key: 'piko-idle', val: pikoIdleImg },
      { key: 'piko-sus', val: pikoSusImg },
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
    gameObjects.forEach(go => {
      go.update(deltaTime);
    });
  };

  const render = (deltaTime) => {
    gameObjects.forEach(go => go.render(deltaTime));
  };

  const gameLoop = (timeStamp) => {
    timePassed = (timeStamp - prevTimeStamp) / 1000;
    timePassed = Math.min(timePassed, 0.1); // Correction hardware limit
    prevTimeStamp = timeStamp;

    fps = Math.round(1 / timePassed);

    update(timePassed);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#3498db';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw FPS
    ctx.fillStyle = 'black';
    ctx.textAlign = 'end';
    ctx.font = '16px Arial';
    ctx.textBaseline = 'top';
    ctx.fillText("FPS: " + fps.toString(), canvas.width - 16, 8);

    // Draw FPS
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = '21px Arial';
    ctx.textBaseline = 'bottom';
    ctx.fillText('Use ArrowLeft - ArrowRight or A - D to Move', centerX, canvas.height - 25);
    ctx.fillText('Use Space or Click to Shoot', centerX, canvas.height);

    render(timePassed);

    requestAnimFrameRef.current = requestAnimationFrame(gameLoop);
  }

  useEffect(() => {
    initialize();
    requestAnimFrameRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestAnimFrameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="protectEggGameWrapper">
      <canvas id="game-canvas" ref={canvasRef} width={512} height={512} />
    </div>
  )
}

export default ProtectEggGame;
