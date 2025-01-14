export function getBullet(parentBullet: string, order: number) {
  return parentBullet !== "" ? `${parentBullet}.${order}` : `${order}`;
}

export function round(number: number, digits: number) {
  try {
    return parseFloat(number.toFixed(digits));
  } catch (error) {
    console.error(error);
  }

}

export function getViewWidth() {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
}

export function getHeatMapColor(value: number): string {
  // Ensure value is between 0 and 1
  const clampedValue = Math.max(0, Math.min(1, value));

  // Define color stops
  const colors = [
    { point: 0, color: [0, 0, 255] },     // Blue
    { point: 0.33, color: [0, 150, 0] },  // Green
    { point: 0.66, color: [255, 255, 0] }, // Yellow
    { point: 1, color: [255, 0, 0] }      // Red
  ];

  // Find the two colors to interpolate between
  let startColor: number[] = [0, 0, 0], endColor: number[] = [0, 0, 0], startPoint = 0, endPoint = 1;
  for (let i = 0; i < colors.length - 1; i++) {
    if (clampedValue >= colors[i].point && clampedValue <= colors[i + 1].point) {
      startColor = colors[i].color;
      endColor = colors[i + 1].color;
      startPoint = colors[i].point;
      endPoint = colors[i + 1].point;
      break;
    }
  }

  // Calculate the interpolation factor
  const range = endPoint - startPoint;
  const factor = (clampedValue - startPoint) / range;

  // Interpolate between the two colors
  const r = Math.round(startColor[0] + factor * (endColor[0] - startColor[0]));
  const g = Math.round(startColor[1] + factor * (endColor[1] - startColor[1]));
  const b = Math.round(startColor[2] + factor * (endColor[2] - startColor[2]));

  return `rgb(${r}, ${g}, ${b}, 0.3)`;
}

export function getSupportResistanceColor(value: number, max: number, min: number): string {
  if (value > 0) {
    const green = 255 - Math.round(255 * value / max);
    return `rgb(${green}, 255, ${green}, 0.3)`;
  } else if (value < 0) {
    const red = 255 - Math.round(255 * value / min);
    return `rgb(255, ${red},${red}, 0.3)`;
  }
  return `rgb(255, 255, 255, 0.3`;
}