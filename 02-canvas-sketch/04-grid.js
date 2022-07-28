const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frames: 0,
  animate: true,
  framesAmplitude: 10,
  lineCap: 'butt'
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
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

      const f = (params.animate ? frame : params.frames) * params.framesAmplitude;

      // const noise = random.noise2D(posX + frame, posY, params.freq); // returns in range of -1 to 1
      const noise = random.noise3D(posX, posY, f, params.freq);
      // we can pass the amplitude as 0.2 but then range will be -0.2 to 0.2 so multiply angle with 0.2
      const angle = noise * Math.PI * params.amp;
      
      // const scale = ((noise + 1) / 2) * 30;
      // const scale = (noise * 0.5 + 0.5)* 30;
      const scale = math.mapRange(noise, -1, 1, params.scaleMin, params.scaleMax);

      context.save();

      context.translate(posX, posY);
      context.translate(marginX, marginY);
      context.translate(cellWidth * 0.5, cellHeight * 0.5);

      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(blockWidth * -0.5, 0);
      context.lineTo(blockWidth * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;
  
  folder = pane.addFolder({ title: 'grid' });
  folder.addInput(params, 'lineCap', { options: {
    butt: 'butt', round: 'round', square: 'square'
  }});
  folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
  folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

  folder = pane.addFolder({ title: 'noise' });
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
  folder.addInput(params, 'amp', { min: 0, max: 1 });
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frames', { min: 0, max: 999 });
  folder.addInput(params, 'framesAmplitude', { min: 0, max: 100 });
}
createPane();

canvasSketch(sketch, settings);
