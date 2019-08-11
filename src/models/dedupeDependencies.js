//@flow
import type {
  InternalPackageFormat,
  Optimal,
  YarnLockPackageFormat,
  YarnLockFileFormat,
} from '../types'

function getYarnLockPack(
  pack: InternalPackageFormat,
  optimalPack?: Optimal<InternalPackageFormat>,
): YarnLockPackageFormat {
  if (optimalPack) {
    return {
      ...optimalPack.optimal,
    }
  } else {
    return {
      ...pack.original,
    }
  }
}

export function dedupeDependencies(
  allPackages: InternalPackageFormat[],
  optimalPackages: Optimal<InternalPackageFormat>[],
): YarnLockFileFormat {
  const resultPackages = {}
  for (const pack of allPackages) {
    const optimalPack = optimalPackages.find(p => p.fullName === pack.fullName)
    resultPackages[pack.fullName] = getYarnLockPack(pack, optimalPack)
  }
  return resultPackages
}
