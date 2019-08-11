//@flow
import type { InternalPackageFormat, Optimal } from './../../types'
import chalk from 'chalk'

/**
 * @return {string}
 */
export function VersionComponent({
  packageDescription,
  grayed,
}: {|
  packageDescription: Optimal<InternalPackageFormat> | InternalPackageFormat,
  grayed: boolean,
|}) {
  const colorizeToGray = (str, color) => (grayed ? chalk.grey(str) : color(str))
  let resultString = `${packageDescription.requestedVersion}: `
  if (packageDescription.optimal) {
    resultString = `${resultString}${colorizeToGray(
      packageDescription.actualVersion,
      chalk.red,
    )} -> ${colorizeToGray(packageDescription.optimal.version, chalk.green)}`
  } else {
    resultString = `${resultString}${packageDescription.actualVersion}`
  }
  return colorizeToGray(resultString, chalk.reset)
}
