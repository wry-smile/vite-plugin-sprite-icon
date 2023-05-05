import { extname } from 'path'
import chalk from 'chalk'
import { name as pluginName } from '../package.json'
const name = `vite-plugin: ${pluginName}`

export const SVG_EXT = '.svg'

export const log = (msg: string) => {
  // eslint-disable-next-line no-console
  console.log(msg)
}

export const error = (msg: string) => {
  log(`${chalk.bgRed(name)} ${chalk.red(msg)}`)
}

export const info = (msg: string) => {
  log(`${chalk.bgBlue(name)} ${chalk.blue(msg)}`)
}

export const warning = (msg: string) => {
  log(`${chalk.bgYellow(name)} ${chalk.yellow(msg)}`)
}

export const isSvg = (name: string) => extname(name) === SVG_EXT
