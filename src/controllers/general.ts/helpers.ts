export function getBullet(parentBullet: string, order: number) {
  return parentBullet !== "" ? `${parentBullet}.${order}` : `${order}`;
}

export function round(number:number, digits: number) {
  try {
    return parseFloat(number.toFixed(digits));
  } catch (error) {
    console.error(error);
  }

}

export function getViewWidth(){
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
}