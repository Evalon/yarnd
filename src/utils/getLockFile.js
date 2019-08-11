//@flow
import type { YarnLockFileFormat } from '../types'
import fs from 'fs'
import * as lockUtils from '@yarnpkg/lockfile'

export function getLockFile(file: string = './yarn.lock'): YarnLockFileFormat {
  const lockString = fs.readFileSync(file, 'utf8')
  return lockUtils.parse(lockString).object
}
