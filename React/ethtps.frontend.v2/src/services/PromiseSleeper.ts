export function promiseSleeper<T>(ms: number) {
  return function (x: T) {
    return new Promise<T>((resolve) => setTimeout(() => resolve(x), ms))
  }
}

export function randomShortSleeper<T>() {
  return promiseSleeper<T>(Math.random() * 1000)
}
