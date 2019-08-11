//@flow

import chalk from 'chalk'

export function HeaderComponent({
  name,
  identicalPackages,
  lowerIdenticalPackages,
}: {
  name: string,
  identicalPackages?: number,
  lowerIdenticalPackages?: number,
}): string {
  let resultString = `${name}`
  if (identicalPackages != null) {
    resultString = `${resultString} [${chalk.red(String(identicalPackages))}]`
    if (lowerIdenticalPackages != null) {
      resultString = `${resultString} -> [${chalk.green(
        String(lowerIdenticalPackages),
      )}]`
    }
  }
  return resultString
}
