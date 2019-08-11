//@flow
import type {
  YarnLockFileFormat,
  YarnLockPackageFormat,
  InternalPackageFormat,
} from '../types'
import R from 'ramda'

const getPackageFormat = ([fullName, pkg]: [
  string,
  YarnLockPackageFormat,
]): InternalPackageFormat => {
  const result = fullName.match(/^(.*)@([^@]*?)$/)
  if (
    result != null &&
    typeof result[0] === 'string' &&
    typeof result[1] === 'string' &&
    typeof result[2] === 'string'
  ) {
    return {
      fullName,
      name: result[1],
      requestedVersion: result[2],
      actualVersion: pkg.version,
      original: pkg,
    }
  } else {
    throw `Package ${fullName} is corrupted`
  }
}

const formatLockFile = R.compose(
  R.map(getPackageFormat),
  R.toPairs,
)

export function getPackages(
  lockFileObject: YarnLockFileFormat,
): Array<InternalPackageFormat> {
  return formatLockFile(lockFileObject)
}
