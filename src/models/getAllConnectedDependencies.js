// @flow
import type { InternalPackageFormat } from '../types'
import R from 'ramda'

export const getAllConnectedDependencies = (
  deps: InternalPackageFormat[],
  connectedWith: string[],
) => {
  let queue = connectedWith
  const result = []
  const existedDepsNames = new Set() // For cycle check
  while (queue.length !== 0) {
    const currentDepName = queue.pop()
    if (existedDepsNames.has(currentDepName)) continue
    const currentDep = deps.find(dep => dep.fullName === currentDepName)
    result.push(currentDep)
    existedDepsNames.add(currentDepName)
    if (currentDep && currentDep.original.dependencies) {
      const deps = R.toPairs(currentDep.original.dependencies)
      for (const subDep of deps) {
        queue.push(subDep[0] + '@' + subDep[1])
      }
    }
  }
  return result
}
