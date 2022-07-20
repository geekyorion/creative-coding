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

    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.3;
    const h = height * 0.3;

    // to save the current context state
    context.save();
    
    context.translate(x, y);
    context.rotate(toRad(45));

    context.beginPath();
    context.fillRect(-w * 0.5, -h * 0.5, w, h);
    context.fill();
    
    // to restore the saved context state
    context.restore();
  };
};

canvasSketch(sketch, settings);
