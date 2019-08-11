//@flow
import type { InternalPackageFormat } from '../types'
import R from 'ramda'
import { groupByName } from './groupByName'

function byUniqueVersion(packages: InternalPackageFormat[]): boolean {
  return R.compose(
    R.lt(1),
    R.length,
    R.uniqBy(R.prop('actualVersion')),
  )(packages)
}

export function getDuplicateDependencies(
  packages: InternalPackageFormat[],
): InternalPackageFormat[] {
  return R.compose<
    InternalPackageFormat[],
    InternalPackageFormat[][],
    InternalPackageFormat[][],
    InternalPackageFormat[],
  >(
    R.flatten, // any because flatten is messed with typings
    R.filter<_, InternalPackageFormat[], any>(byUniqueVersion),
    groupByName,
  )(packages)
}
