// @flow
//eslint-disable-file no-console
import chalk from 'chalk'
import type { InternalPackageFormat, Optimal } from './../types'
import { PackageComponent } from './components/PackageComponent'

// This all should be rewrited to something (react for example)
export function PackageView({
  packages,
  optimizedPackages,
}: {
  packages: Array<InternalPackageFormat>,
  optimizedPackages: Array<Optimal<InternalPackageFormat>>,
}): void {
  console.log(
    chalk.red('>') + PackageComponent({ packages, optimizedPackages }),
  )
}
