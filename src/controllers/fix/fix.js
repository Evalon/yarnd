//@flow
import * as R from 'ramda'
import util from 'util'
import path from 'path'
import { getLockFile } from '../../utils/getLockFile'
import { getPackages } from '../../models/getPackages'
import { getDuplicateDependencies } from '../../models/getDuplicateDependencies'
import { getPossibleToDedupeDependencies } from '../../models/getPossibleToDedupeDependencies'
import { filterByCommandLine } from '../filterByCommandLine'
import { PackageView } from '../../views/PackageView'
import { mergeWithDefaultObject } from '../mergeWithDefaultObject'
import { dedupeDependencies } from '../../models/dedupeDependencies'
import { writeLockFile } from '../../utils/writeLockFile'

import { exec as exec_callback } from 'child_process'
const exec = util.promisify(exec_callback)

exports.command = ['fix [included..]']

exports.desc = 'Check for duplicated dependencies in yarn.lock'

exports.builder = {
  lock: {
    alias: 'l',
    describe: 'Specify where the yarn.lock file is placed',
    string: true,
    default: 'yarn.lock',
  },
  included: {
    alias: 'i',
    describe: 'Specify included dependencies (not transitive)',
    array: true,
    default: [],
  },
  excluded: {
    alias: 'e',
    describe: 'Specify excluded dependencies (not transitive)',
    array: true,
    default: [],
  },
  primary: {
    alias: 'p',
    describe: 'Check production dependencies (transitive)',
    boolean: true,
    default: false,
  },
  dev: {
    alias: 'd',
    describe: 'Check development dependencies (transitive)',
    boolean: true,
    default: false,
  },
}

exports.handler = async function(argvParam: Object) {
  const argv = mergeWithDefaultObject(argvParam, exports.builder)
  const yarnLockPackages = getLockFile(argv.lock)
  const packages = getPackages(yarnLockPackages)
  const filteredDesc = filterByCommandLine(argv, packages)
  const duplicatePackages = getDuplicateDependencies(filteredDesc.all)
  const optimizedPackages = getPossibleToDedupeDependencies(duplicatePackages)
  const deduped = dedupeDependencies(packages, optimizedPackages)
  const groupedDuplicatePackages = R.groupBy(R.prop('name'))(duplicatePackages)
  const groupedOptimizedPackages = R.groupBy(R.prop('name'))(optimizedPackages)

  for (const [name, packages] of R.toPairs(groupedDuplicatePackages)) {
    const optimizedPackages = groupedOptimizedPackages[name]
      ? groupedOptimizedPackages[name]
      : []
    if (optimizedPackages.length === 0) continue
    PackageView({ packages, optimizedPackages })
  }
  writeLockFile(deduped, argv.lock)
  await exec(
    'yarn install --force',
    { cwd: path.resolve(argv.lock, './../') },
    (e, out, err) => console.log(out || err),
  )
  return Promise.resolve('Dependencies deduped')
}
