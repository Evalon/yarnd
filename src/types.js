//@flow

export type YarnLockPackageFormat = {
  version: string,
  resolved: string,
  integrity: string,
  dependencies?: Object,
  optionalDependencies?: Object,
}

export type YarnLockFileFormat = {
  [key: string]: YarnLockPackageFormat,
}

export type InternalPackageFormat = {|
  fullName: string,
  name: string,
  requestedVersion: string,
  actualVersion: string,
  original: YarnLockPackageFormat,
|}

export type Optimal<T> = {
  ...$Exact<T>,
  optimal: YarnLockPackageFormat,
}
