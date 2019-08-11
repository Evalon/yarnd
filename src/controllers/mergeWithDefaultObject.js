//@flow
import R from 'ramda'

const getDefaultObject = R.compose(
  R.fromPairs,
  R.map(([key, value]) => [key, value.default]),
  R.toPairs,
)

export function mergeWithDefaultObject(argv: any, defaultBuilder: any): any {
  const defaultObject = getDefaultObject(defaultBuilder)
  return R.mergeDeepLeft(argv, defaultObject)
}
