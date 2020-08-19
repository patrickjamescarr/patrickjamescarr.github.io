import Colours from "./Colours";

const backgroundColour = '#212121'; // Colours.find(c => c.legoColourId === 26).hex; // lego black
const offsetFactor = 16;

export default class ImageProcessor {

  processImage(imageCtx, outputCtx, dotSize, palette, scale) {
    const dotOffset = dotSize / offsetFactor;
    const coloursUsed = [];
    const width = imageCtx.canvas.width;
    const height = imageCtx.canvas.height;

    outputCtx.canvas.width = width * scale;
    outputCtx.canvas.height = height * scale;

    outputCtx.clearRect(0, 0, width, height);
    outputCtx.scale(scale, scale);

    const { dotsHeight, dotsWidth } = this.calculateDotDimentions(width, height, dotSize);

    let segmentSize = this.calculateSegmentSize(width, dotSize);

    const outputArray = [];

    for (let y = 0; y < dotsHeight; y++) {
      outputArray.push([]);
      for (let x = 0; x < dotsWidth; x++) {
        let { r, g, b } = this.getAverageRGBValuesFromImageSegment(imageCtx, x, segmentSize, y);
        const dotColour = palette === 'lego' ? this.colourMatch(r, g, b, coloursUsed).hex : this.toRGBString(r, g, b);
        outputArray[y].push(dotColour);
        this.drawDotToContext(outputCtx, backgroundColour, x, segmentSize, y, dotColour, dotOffset);
      }
    }

    return {
      coloursUsed: coloursUsed,
      dotsWidth: dotsWidth,
      dotsHeight: dotsHeight,
      outputArray: outputArray,
    };
  }

  calculateSegmentSize(width, dotSize) {
    return width / (width / dotSize);
  }

  calculateDotDimentions(width, height, dotSize) {
    const dotsWidth = Math.floor(width / dotSize);
    const dotsHeight = Math.floor(height / dotSize);
    return { dotsHeight, dotsWidth };
  }

  redrawImage(imageCtx, outputCtx, dotSize, scale, outputArray) {
    const dotOffset = dotSize / offsetFactor;

    const width = imageCtx.canvas.width;
    const height = imageCtx.canvas.height;

    outputCtx.canvas.width = width * scale;
    outputCtx.canvas.height = height * scale;

    outputCtx.clearRect(0, 0, width, height);
    outputCtx.scale(scale, scale);

    const { dotsHeight, dotsWidth } = this.calculateDotDimentions(width, height, dotSize);

    let segmentSize = this.calculateSegmentSize(width, dotSize);

    for (let y = 0; y < dotsHeight; y++) {
      for (let x = 0; x < dotsWidth; x++) {
        try {
          const dotColour = outputArray[y][x];
          this.drawDotToContext(outputCtx, backgroundColour, x, segmentSize, y, dotColour, dotOffset);
        }
        catch {
          console.log('bad indexes: y=' + y + ', x=' + x);
        }
      }
    }
  }

  drawDotToContext(outputCtx, backgroundColour, x, segmentSize, y, dotColour, dotOffset) {
    outputCtx.beginPath();
    // draw the background square
    outputCtx.fillStyle = backgroundColour;
    outputCtx.fillRect(x * segmentSize, y * segmentSize, segmentSize, segmentSize);
    // draw the dot
    outputCtx.strokeStyle = dotColour;
    outputCtx.fillStyle = dotColour;
    outputCtx.arc(((segmentSize) / 2) + (x * segmentSize), ((segmentSize) / 2) + (y * segmentSize), ((segmentSize) / 2) - dotOffset, 0, 2 * Math.PI);
    outputCtx.fill();
    outputCtx.stroke();
  }

  toRGBString(r, g, b) {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  getAverageRGBValuesFromImageSegment(imageCtx, x, pieceSize, y) {
    let imgData = imageCtx.getImageData(x * pieceSize, y * pieceSize, pieceSize, pieceSize);

    let r = 0, g = 0, b = 0;

    for (let i = 0; i < imgData.data.length; i += 4) {
      r += imgData.data[i];
      g += imgData.data[i + 1];
      b += imgData.data[i + 2];
      // a += imgData.data[i + 3]; // alpha channel if required in future
    }

    r = r / (imgData.data.length / 4);
    g = g / (imgData.data.length / 4);
    b = b / (imgData.data.length / 4);

    return { r, g, b };
  }

  colourMatch(r, g, b, coloursUsed) {
    const matchResults = Colours.map(c => {
      const colour = hexToRgb(c.hex);

      let red = r - colour.r;
      let green = g - colour.g;
      let blue = b - colour.b;

      if (red < 0)
        red *= -1;
      if (green < 0)
        green *= -1;
      if (blue < 0)
        blue *= -1;

      return red + green + blue;
    });

    const lowestMatchIndex = matchResults.indexOf(Math.min(...matchResults));
    const closestColourMatch = Colours[lowestMatchIndex];

    this.incrementUseCount(closestColourMatch, coloursUsed);

    return closestColourMatch;
  }

  incrementUseCount(colour, coloursUsed) {
    const usedIndex = coloursUsed.findIndex(x => x.colour.legoColourId === colour.legoColourId);

    if (usedIndex > -1) {
      coloursUsed[usedIndex].count++;
    }
    else {
      coloursUsed.push({ colour: colour, count: 1 });
    }
  }
};

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}



