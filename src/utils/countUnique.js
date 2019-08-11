// @flow
export function countUnique(iterable: Iterable<any>) {
  return new Set(iterable).size
}
