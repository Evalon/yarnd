// @flow
//eslint-disable-file no-console
import type { InternalPackageFormat, Optimal } from './../types'
import { PackageComponent } from './components/PackageComponent'

module.exports = ({
  packages,
  optimizedPackages,
}: {
  packages: Array<InternalPackageFormat>,
  optimizedPackages: Array<Optimal<InternalPackageFormat>>,
}): string => {
  return PackageComponent({ packages, optimizedPackages })
}
