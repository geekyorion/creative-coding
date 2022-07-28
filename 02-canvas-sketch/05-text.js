const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager;
let text = 'A';
let fontSize = 1000;
let fontFamily = 'Serif';

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = 'top';
    // context.textAlign = 'center';
    const metrics = context.measureText(text);

    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const x = (width - mw) * 0.5 - mx;
    const y = (height - mh) * 0.5 - my;

    context.save();
    context.translate(x, y);
    context.fillText(text, 0, 0);
    context.restore();
  };
};

document.addEventListener('keyup', (event) => {
  text = event.key.toUpperCase();
  manager && manager.render();
});

(async() => {
  manager = await canvasSketch(sketch, settings);
})();
