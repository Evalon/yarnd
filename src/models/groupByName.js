//@flow
import type { InternalPackageFormat } from '../types'

const R = require('ramda')
export function groupByName(
  packages: InternalPackageFormat[],
): InternalPackageFormat[][] {
  return R.compose(
    R.defaultTo([]),
    R.values,
    R.groupBy(R.prop('name')),
  )(packages)
}
