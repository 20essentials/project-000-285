const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let $width = (canvas.width = document.documentElement.scrollWidth);
let $height = (canvas.height = document.documentElement.scrollHeight);

const resizeCanvas = () => {
  $width = canvas.width = document.documentElement.scrollWidth;
  $height = canvas.height = document.documentElement.scrollHeight;
};

const generateRandomColor = () =>
  `rgba(${[...Array(3)].map(n => Math.floor(Math.random() * 255))},0.8)`;

const drawCanvas = (x, y, color, size, angle) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(20, -50);
  ctx.fillStyle = color;
  ctx.quadraticCurveTo(size / 2, -size, size, 0);
  ctx.quadraticCurveTo(size, size / 2, 0, 0);
  ctx.quadraticCurveTo(0, 0, size, size);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
};

const drawMessage = () => {
  ctx.beginPath();
  ctx.font = '20px Arial';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Click to make a Tetram', $width / 2, $height / 2);
  ctx.closePath();
};

document.addEventListener('click', e => {
  const x = e.clientX;
  const y = e.clientY;
  const color = generateRandomColor();
  const petalSize = Math.floor(Math.random() * 50) + 20;
  let num = Math.floor(Math.random() * 4) + 19;
  const numberOfPetal = num % 2 === 1 ? num : num + 1;
  for (let petal = 0; petal < numberOfPetal; petal++) {
    const angle = petal * ((Math.PI * 2) / numberOfPetal);
    drawCanvas(x, y, color, petalSize, angle);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  resizeCanvas();
  drawMessage();

  window.addEventListener('resize', () => {
    resizeCanvas();
    drawMessage();
  });
});
