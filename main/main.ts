import type { Plugin, UserConfig } from 'vite'
import type { UserOptions } from './types'
import { analysisSvg } from './analysis'
import { DEFAULT_OPTIONS, RESOLVED_VIRTUAL_MODULE_ID, VIRTUAL_MODULE_ID, pluginName } from './const'

export const spriteIcon = (options: UserOptions) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  const { autoInject } = options
  let isBuild = false
  let userConfig: UserConfig = {}

  const { visualModule } = analysisSvg(options, userConfig)

  return {
    name: pluginName,
    config(config, env) {
      userConfig = config
      isBuild = env.command === 'build'
    },
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID)
        return visualModule
    },
    // transformIndexHtml: {
    //   handler(html) {
    //     const { autoInject, output } = options
    //     const { root } = userConfig

    //     console.log(output)

    //     return {
    //       html,
    //       tags: autoInject
    //         ? [
    //             {
    //               tag: 'script',
    //               injectTo: 'head',
    //               attrs: { src: '' },
    //             },
    //           ]
    //         : [],
    //     }
    //   },
    // },
  } as Plugin
}

