export function RandomInteger(min: number, max: number) {
  // include min & max
  return Math.floor(Math.random() * (max - min + 1)) + min
}
