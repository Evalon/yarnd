// @flow
export const getCartesianProduct = (...sets: $ReadOnlyArray<any>[]): $ReadOnlyArray<any>[] => {
  let acc = [[]]
  for (const set of sets) {
    let result = []
    for (const x of acc) {
      for (const y of set) {
        result.push([...x, y])
      }
    }
    acc = result
  }
  return acc;
};
