export function indexOfOr(
  arr: string[],
  value?: string,
  defaultIndex: number = 0,
) {
  if (value === undefined) return defaultIndex
  if (arr.find((x) => x === value) !== undefined) {
    return arr.indexOf(value as string)
  } else if (arr.length > 0) {
    return Math.min(arr.length, defaultIndex)
  } else {
    return -1
  }
}
