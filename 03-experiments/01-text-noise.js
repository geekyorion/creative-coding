const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

document.body.style.backgroundColor = 'black';

const params = {
  freq: 0.001,
  amp: 0.2,
  frames: 0,
  animate: true,
  framesAmplitude: 10
};

const settings = {
  dimensions: [ 1080, 1080],
  animate: params.animate
};

let manager;
let text = 'A';
let fontSize = 1000;
let fontFamily = 'Serif';
let glyphs = [];
let glyphsGenerated = false;
let glyphsCounter = 0;

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ width, height }) => {
  const cellSize = 20;
  const cols = ~~(width / cellSize);
  const rows = ~~(height / cellSize);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height, frame }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);
    
    fontSize = cols * 1.2;

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';

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

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.textBaseline = 'middle';
    context.textAlign = 'center';

    const f = (params.animate ? frame : params.frames) * params.framesAmplitude;
    const noise = random.noise3D(tx, ty, f, params.freq);
    const angle = noise * Math.PI * params.amp;

    context.font = `${cellSize * 2}px ${fontFamily}`;

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

      const glyph = getGlyph(r);

      context.save();

      context.translate(x, y);
      context.rotate(angle);
      context.translate(cellSize * 0.5, cellSize * 0.5);
      context.fillText(glyph, 0, 0);

      context.restore();
    }

    glyphsGenerated = true;
    glyphsCounter = 0;
  };
};

const getGlyph = (v) => {
  if (glyphsGenerated) return glyphs[glyphsCounter++];

  let glyph = '';
  if (v < 50) glyph = '';
  else if (v < 100) glyph = '.';
  else if (v < 150) glyph = '/';
  else if (v < 200) glyph = '+';
  else {
    const chars = '=_~/'.split('');
    glyph = random.pick(chars);
  }
  glyphs.push(glyph);
  return glyph;
}

document.addEventListener('keyup', (event) => {
  const pressedKey = event.key.toUpperCase();
  if (/^[A-Z]$/.test(pressedKey)) {
    glyphs = [];
    glyphsGenerated = false;
    glyphsCounter = 0;
    text = pressedKey;
    manager && manager.render();
  }
});

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder = pane.addFolder({ title: 'noise' });
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
  folder.addInput(params, 'amp', { min: 0, max: 1 });
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frames', { min: 0, max: 999 });
  folder.addInput(params, 'framesAmplitude', { min: 0, max: 100 });
}
createPane();

(async() => {
  manager = await canvasSketch(sketch, settings);
})();
