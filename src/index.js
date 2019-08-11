import cli from 'yargs'
import * as checkCommand from './controllers/check/check'
import * as fixCommand from './controllers/fix/fix'

export const dedupe = args => {
  return new Promise((resolve, reject) => {
    cli
      .fail((msg, err) => reject(`${err}`))
      .command(checkCommand)
      .command(fixCommand)
      .parse(args, () => {}, () => resolve('Success'))
  })
}
