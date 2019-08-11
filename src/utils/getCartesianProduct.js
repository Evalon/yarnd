// @flow
const flatten = (arr: any[][]): any[] => [].concat.apply([], arr)

export const getCartesianProduct = (
  ...sets: $ReadOnlyArray<any>[]
): $ReadOnlyArray<any>[] =>
  sets.reduce((acc, set) => flatten(acc.map(x => set.map(y => [...x, y]))), [
    [],
  ])
