import { name as pluginName } from '../package.json'
import type { UserOptions } from './types'

export { pluginName }

export const MESSAGE_TITLE = `[vite-plugin: ${pluginName}]`

export const SVG_EXT = '.svg'

export const GLYPHS_NAME_FILE_NAME = 'icons'

export const SPRITE_ICON_FILE_NAME = 'sprite.icon'

export const VIRTUAL_MODULE_ID = 'virtual:sprite-icon-module'

export const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`

export const DEFAULT_OPTIONS: UserOptions = {
  output: '/src/assets/sprite-icon',
  glyphsName: true,
  autoInject: true,
  symbolId: (name: string) => `sprite-${name}`,
  delete: true,
  spriteFileName: SPRITE_ICON_FILE_NAME,
}
