import './style.css';

import React, { useEffect, useRef } from 'react';

// import topedIdleImg from './assets/toped_1.png';

const ProtectEggGame = () => {
  const canvasRef = useRef(null);
  const requestAnimFrameRef = useRef(null);

  /** @type {HTMLCanvasElement} */
  let canvas;
  /** @type {CanvasRenderingContext2D}*/
  let ctx;

  let timePassed = 0;
  let prevTimeStamp = 0;
  let fps = 0;

  const player = {
    pos: { x: 0, y: 0 },
    velocity: { x: 25, y: 20 },
    radius: 32,
    sprite: new Image(),
  };

  const start = () => {};
  const preload = () => {};

  const initialize = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');

    start();
    preload();
  };

  const update = (deltaTime) => {
    // console.log({ deltaTime });
    player.pos.x += player.velocity.x * deltaTime;
    player.pos.y += player.velocity.y * deltaTime;
  };

  const render = (deltaTime) => {
    ctx.fillStyle = '#e67e22';
    ctx.beginPath();
    ctx.arc(player.pos.x, player.pos.y, player.radius, 0, Math.PI * 2);
    ctx.fill();
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
    ctx.fillStyle = 'white';
    ctx.textAlign = 'end';
    ctx.font = '16px Arial';
    ctx.textBaseline = 'top';
    ctx.fillText("FPS: " + fps.toString(), canvas.width - 16, 8);

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
