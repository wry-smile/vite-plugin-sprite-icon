import { extname } from 'path'
import chalk from 'chalk'
import { MESSAGE_TITLE, SVG_EXT } from './const'

export const log = (msg: string) => {
  // eslint-disable-next-line no-console
  console.log(msg)
}

export const error = (msg: string) => {
  log(`${chalk.blueBright(MESSAGE_TITLE)} ${chalk.red(msg)}`)
}

export const info = (msg: string) => {
  log(`${chalk.blueBright(MESSAGE_TITLE)} ${chalk.blue(msg)}`)
}

export const warning = (msg: string) => {
  log(`${chalk.blueBright(MESSAGE_TITLE)} ${chalk.yellow(msg)}`)
}

export const success = (msg: string) => {
  log(`${chalk.blueBright(MESSAGE_TITLE)} ${chalk.green(msg)}`)
}

export const isSvg = (name: string) => extname(name) === SVG_EXT

export const uuid = () => Number(Math.random().toString().substring(2)).toString(32)
