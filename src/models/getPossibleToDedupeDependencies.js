//@flow
import type { Optimal, InternalPackageFormat } from '../types'
import R from 'ramda'
import semver from 'semver'
import { getDuplicateDependencies } from './getDuplicateDependencies'
import { countUnique } from './../utils/countUnique'
import { getCartesianProduct } from './../utils/getCartesianProduct'
import { groupByName } from './groupByName'

const filterVersionsByRange = (versions, range) =>
  versions.filter(version => semver.satisfies(version, range))

const getOptimalVersion = (
  desc: InternalPackageFormat[],
): Optimal<InternalPackageFormat>[] => {
  const versions = R.map(R.prop('actualVersion'), desc)
  const ranges = R.map(R.prop('requestedVersion'), desc)
  const uniqueVersions = R.uniq(versions)
  const possibleVersions = ranges.map(range =>
    filterVersionsByRange(uniqueVersions, range),
  )
  const possibleVersionsInRanges = getCartesianProduct(...possibleVersions)
  if (possibleVersionsInRanges.length > 1) {
    const optimalVersions = R.reduce(
      R.minBy(countUnique),
      uniqueVersions,
      possibleVersionsInRanges,
    )
    if (countUnique(optimalVersions) !== uniqueVersions.length) {
      return desc.map((pkg, i) => {
        const optimal = desc.find(
          p => p.name === pkg.name && p.actualVersion === optimalVersions[i],
        )
        if (optimal) {
          return {
            ...pkg,
            optimal: optimal.original,
          }
        } else {
          throw 'Something has gone terribly wrong. Please check manually dependency: ' +
            pkg.fullName
        }
      })
    }
  }
  return []
}

const filterByOptimalVersion = (
  packages: InternalPackageFormat[][],
): Optimal<InternalPackageFormat>[][] =>
  R.compose(
    R.reject(R.isEmpty),
    R.map(getOptimalVersion),
  )(packages)

export const getPossibleToDedupeDependencies = (
  packages: InternalPackageFormat[],
): Optimal<InternalPackageFormat>[] =>
  R.compose(
    R.chain(R.identity),
    filterByOptimalVersion,
    groupByName,
    getDuplicateDependencies,
  )(packages)
