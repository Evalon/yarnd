// @ts-ignore
const corejs = 3

const presets = () => {
  const presetEnv = {
    useBuiltIns: 'usage',
    shippedProposals: true,
    loose: true,
    corejs,
    targets: {
      node: '10.15.0',
    },
  }
  return ['@babel/preset-flow', ['@babel/preset-env', presetEnv]]
}

const plugins = () => {
  return [['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }]]
}

module.exports = api => {
  api.cache(true)
  return {
    presets: presets(api),
    plugins: plugins(api),
  }
}
