const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const boxWidth = width * 0.1;
    const boxHeight = width * 0.1;
    const gap = boxWidth * 0.3;
    const smallSizeReduction = boxWidth * 0.1;
    const xi = width * 0.17;
    const yi = width * 0.17;
    let x, y;
    
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        context.strokeStyle = 'black';
        context.lineWidth = boxWidth * 0.06;
        x = xi + (boxWidth + gap) * i;
        y = yi + (boxHeight + gap) * j;
        
        context.beginPath();
        context.rect(x, y, boxWidth, boxHeight);
        context.stroke();
        
        if (Math.random() > 0.5) {
          context.strokeStyle = '#444';
          context.lineWidth = boxWidth * 0.18 - 4;
          context.beginPath();
          context.rect(
            x + smallSizeReduction,
            y + smallSizeReduction,
            boxWidth - smallSizeReduction * 2,
            boxHeight - smallSizeReduction * 2
          );
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
