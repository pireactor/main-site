export function* range(stop: number, step: number = 1) {
  for (let i = 0; i < stop; i += step) {
    yield i;
  }
}