// @flow
import fs from 'fs'

export function getPackageJson(filePath: string = './package.json'): Object {
  try {
    const packageJsonString = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(packageJsonString)
  } catch (error) {
    return {}
  }
}
