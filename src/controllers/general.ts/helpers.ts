export function getBullet(parentBullet: string, order: number) {
  return parentBullet !== "" ? `${parentBullet}.${order}` : `${order}`;
}