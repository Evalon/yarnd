//@flow
import R from 'ramda'
import type { InternalPackageFormat, Optimal } from '../../types'
import { HeaderComponent } from './HeaderComponent'
import { VersionComponent } from './VersionComponent'

export const PackageComponent = ({
  packages,
  optimizedPackages,
}: {
  packages: Array<InternalPackageFormat>,
  optimizedPackages: Array<Optimal<InternalPackageFormat>>,
}): string => {
  let resultString
  resultString = `${HeaderComponent({
    name: packages[0] ? packages[0].name : '',
    identicalPackages: R.uniqBy(R.prop('actualVersion'), packages).length,
    lowerIdenticalPackages:
      optimizedPackages.length > 0
        ? R.uniqBy((R.path(['optimal', 'version']): Object), optimizedPackages)
            .length
        : undefined,
  })}:`
  const duplicated = R.uniqBy(
    R.prop('fullName'),
    ([...optimizedPackages, ...packages]: (
      | Optimal<InternalPackageFormat>
      | InternalPackageFormat
    )[]),
  )
  for (const packageDescription of duplicated) {
    resultString = `${resultString}
    ${VersionComponent({
      packageDescription,
      grayed:
        packageDescription.optimal != null &&
        packageDescription.optimal.version !== null &&
        packageDescription.actualVersion === packageDescription.optimal.version,
    })}`
  }
  return resultString
}
