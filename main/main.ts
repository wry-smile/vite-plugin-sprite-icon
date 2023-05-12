import type { Plugin, UserConfig } from 'vite'
import type { UserOptions } from './types'
import { analysisSvg } from './analysis'
import { DEFAULT_OPTIONS, RESOLVED_VIRTUAL_MODULE_ID, VIRTUAL_MODULE_ID, pluginName } from './const'

export const spriteIcon = (options: UserOptions) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  const { virtualModule } = options

  let userConfig: UserConfig = {}

  const { virtualModuleContent } = analysisSvg(options, userConfig) || {}

  return {
    name: pluginName,
    config(config) {
      userConfig = config
    },
    resolveId(id) {
      if (virtualModule && id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID
    },
    load(id) {
      if (virtualModule && id === RESOLVED_VIRTUAL_MODULE_ID && virtualModuleContent)
        return virtualModule
    },
  } as Plugin
}

