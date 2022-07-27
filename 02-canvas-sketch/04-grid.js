const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
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

      const frameAmplitude = 30;

      const noise = random.noise2D(posX + frame * frameAmplitude, posY, 0.001); // returns in range of -1 to 1
      // we can pass the amplitude as 0.2 but then range will be -0.2 to 0.2 so multiply angle with 0.2
      const angle = noise * Math.PI * 0.4;
      
      // const scale = ((noise + 1) / 2) * 30;
      // const scale = (noise * 0.5 + 0.5)* 30;
      const scale = math.mapRange(noise, -1, 1, 1, 30);

      context.save();

      context.translate(posX, posY);
      context.translate(marginX, marginY);
      context.translate(cellWidth * 0.5, cellHeight * 0.5);

      context.rotate(angle);

      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(blockWidth * -0.5, 0);
      context.lineTo(blockWidth * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
