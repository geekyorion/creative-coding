const canvasSketch = require('canvas-sketch');
const { toRad } = require('./utils');

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

    const num = 12;
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
  
      context.beginPath();
      context.fillRect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      
      // to restore the saved context state
      context.restore();
    }

  };
};

canvasSketch(sketch, settings);
