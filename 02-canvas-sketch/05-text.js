const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager;
let text = 'A';
let fontSize = 1000;
let fontFamily = 'Serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ width, height }) => {
  const cellSize = 20;
  const cols = ~~(width / cellSize);
  const rows = ~~(height / cellSize);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);
    
    fontSize = cols;

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';
    // typeContext.textAlign = 'center';
    const metrics = typeContext.measureText(text);

    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx, ty);
    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.drawImage(typeCanvas, 0, 0);

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = ~~(i / cols);

      const x = col * cellSize;
      const y = row * cellSize;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];
      context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;

      context.save();
      context.translate(x, y);
      context.translate(cellSize * 0.5, cellSize * 0.5);
      // context.fillRect(0, 0, cellSize, cellSize);
      context.beginPath();
      context.arc(0, 0, cellSize * 0.5, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }
  };
};

document.addEventListener('keyup', (event) => {
  text = event.key.toUpperCase();
  manager && manager.render();
});

(async() => {
  manager = await canvasSketch(sketch, settings);
})();
