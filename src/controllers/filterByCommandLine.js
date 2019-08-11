//@flow
import type { InternalPackageFormat } from '../types'
import path from 'path'
import R from 'ramda'
import { getPackageJson } from '../utils/getPackageJson'
import { getAllConnectedDependencies } from '../models/getAllConnectedDependencies'

const getTransitiveDepsFromPackageJson = (
  deps: InternalPackageFormat[],
  field: string,
  packageJsonPath: string,
) => {
  const packages = R.map(
    pair => pair[0] + '@' + pair[1],
    R.toPairs(getPackageJson(packageJsonPath)[field]),
  )
  if (packages != null) {
    return getAllConnectedDependencies(deps, packages)
  } else {
    return []
  }
}

export function filterByCommandLine(
  argv: Object,
  deps: InternalPackageFormat[],
) {
  let resultPackages = []
  const packageJsonPath = path.resolve(argv.lock, './../package.json')
  let dependencies = getTransitiveDepsFromPackageJson(
    deps,
    'dependencies',
    packageJsonPath,
  )
  let devDependencies = getTransitiveDepsFromPackageJson(
    deps,
    'devDependencies',
    packageJsonPath,
  )
  if (argv.primary) {
    resultPackages = [...resultPackages, ...dependencies]
  }
  if (argv.dev) {
    resultPackages = [...resultPackages, ...devDependencies]
  }

  if (argv.included.length > 0) {
    for (const dep of argv.included) {
      if (dep[dep.length - 1] === '/') {
        const packages = R.filter(d => d.fullName.startsWith(dep), deps)
        resultPackages = [...resultPackages, ...packages]
      } else {
        const packages = R.filter(d => d.name === dep, deps)
        resultPackages = [...resultPackages, ...packages]
      }
    }
  }
  if (!argv.primary && !argv.dev && argv.included.length === 0) {
    resultPackages = [...deps]
  }
  let all = R.uniqBy<InternalPackageFormat, _>(
    R.prop('fullName'),
    resultPackages,
  )
  if (argv.excluded.length > 0) {
    for (const dep of argv.excluded) {
      if (dep[dep.length - 1] === '/') {
        all = R.reject(d => d.fullName.startsWith(dep), all)
      } else {
        all = R.reject(d => d.name === dep, all)
      }
    }
  }
  return {
    all,
    dependencies,
    devDependencies,
  }
}
