const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = 10;
    const rows = 10;
    const numCells = cols * rows;

    const gridWidth = width * 0.8;
    const gridHeight = height * 0.8;
    const cellWidth = gridWidth / cols;
    const cellHeight = gridHeight / rows;

    const marginX = (width - gridWidth) / 2;
    const marginY = (height - gridHeight) / 2;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = ~~(i / cols);

      const posX = col * cellWidth;
      const posY = row * cellHeight;

      const blockWidth = cellWidth * 0.8;
      const blockHeight = cellHeight * 0.8;

      context.save();

      context.translate(posX, posY);
      context.translate(marginX, marginY);
      context.translate(cellWidth * 0.5, cellHeight * 0.5);

      context.lineWidth = 4;

      context.beginPath();
      context.moveTo(blockWidth * -0.5, 0);
      context.lineTo(blockWidth * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
