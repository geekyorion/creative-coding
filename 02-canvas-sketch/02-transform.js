const canvasSketch = require('canvas-sketch');
const { toRad, random } = require('./utils');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 40;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = toRad(360 / num);
      const angle = slice * i;
      
      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      // to save the current context state
      context.save();
      
      context.translate(x, y);
      context.rotate(-angle);

      context.scale(random(0.1, 2), random(0.2, 0.5));
  
      context.beginPath();
      context.fillRect(-w * 0.5, random(0, -h * 0.5), w, h);
      context.fill();
      
      // to restore the saved context state
      context.restore();

      context.lineWidth = random(5, 20);

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.beginPath();
      context.arc(
        0,
        0,
        radius * random(0.7, 1.3),
        slice * random(1, -8),
        slice * random(1, 5)
      );
      context.stroke();

      context.restore();
    }

  };
};

canvasSketch(sketch, settings);
