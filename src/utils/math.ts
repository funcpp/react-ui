/**
 *
 * @param value
 * @param min
 * @param max
 * @returns a number clamped between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 *
 * @param value
 * @param min
 * @param max
 * @returns a number normalized between min and max (0 and 1)
 */
function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

/**
 *
 * @param a
 * @param b
 * @param t
 * @returns a number linearly interpolated between a and b
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export { clamp, normalize, lerp };
