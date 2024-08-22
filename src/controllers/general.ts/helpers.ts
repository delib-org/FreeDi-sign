export function getBullet(parentBullet: string, order: number) {
  return parentBullet !== "" ? `${parentBullet}.${order}` : `${order}`;
}

export function round(number:number, digits: number) {
  try {
    
  } catch (error) {
    
  }
  return parseFloat(number.toFixed(digits));
}