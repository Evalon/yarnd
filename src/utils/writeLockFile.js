//@flow
import type { YarnLockFileFormat } from '../types'
import fs from 'fs'
import * as lockUtils from '@yarnpkg/lockfile'

export function writeLockFile(
  data: YarnLockFileFormat,
  file: string = './yarn.lock',
) {
  fs.writeFileSync(file, lockUtils.stringify(data))
}
