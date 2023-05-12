import { existsSync, mkdirSync, readFileSync, readdirSync, rmdirSync, statSync, unlinkSync, writeFileSync } from 'fs'
import { dirname, format, join, resolve } from 'path'
import { cwd } from 'process'
import type { XmlDocument } from '@rgrove/parse-xml'
import { parseXml } from '@rgrove/parse-xml'
import { isArray, isString } from '@wry-smile/utils-is'
import type { UserConfig } from 'vite'
import type { UserOptions } from './types'
import { error, info, isSvg, success } from './utils'
import { DEFAULT_OPTIONS, GLYPHS_NAME_FILE_NAME, SPRITE_ICON_FILE_NAME, SVG_EXT } from './const'

interface SvgNameListType {
  name: string
  path: string
}

interface ParseSvgType {
  result: string
  json: XmlDocument
  path: string
  name: string
}

const getSymbolName = (symbol: any, name: string) => {
  return isString(symbol) ? symbol : DEFAULT_OPTIONS.symbolId!(name)
}

const mkFolderSync = (path: string) => {
  if (existsSync(path)) {
    return true
  }
  else {
    if (mkFolderSync(dirname(path))) {
      mkdirSync(path)
      return true
    }
  }
}

const rmFolderSync = (path: string) => {
  const files = readdirSync(path)

  for (const fileName of files) {
    const filePath = join(path, fileName)
    const state = statSync(filePath)
    if (state.isDirectory())
      rmFolderSync(filePath)
    else
      unlinkSync(filePath)
  }

  rmdirSync(path)
}

const removeNewLineChatCode = (string: string) => string.replace(/\n/g, '')

const getAllSvgName = (entry: string[]): SvgNameListType[] => {
  const svgNameList: SvgNameListType[] = []
  for (const entryAddress of entry) {
    try {
      const result = readdirSync(entryAddress)

      const filterList = result
        .filter(name => isSvg(name))
        .map(name => ({ name: name.replace(SVG_EXT, ''), path: entryAddress }))

      svgNameList.push(...filterList)
    }
    catch (e) {
      error(`${entryAddress} is invalid`)
    }
  }
  return svgNameList
}

const parseSvg = (nameList: SvgNameListType[], options: UserOptions): ParseSvgType[] => {
  const parseList: ParseSvgType[] = []
  const { svgToJSON } = options

  for (const item of nameList) {
    const { name, path } = item
    const _path = format({ dir: path, name, ext: SVG_EXT })
    const result = readFileSync(_path, { encoding: 'utf-8' })
    const parseJSON = svgToJSON ? parseXml(result) : {} as XmlDocument
    parseList.push({ result, json: parseJSON, path, name })
  }

  return parseList
}

export const writeJSON = (list: ParseSvgType[], options: UserOptions) => {
  const { output } = options
  const dirPath = resolve(cwd(), output!)
  for (const item of list) {
    const { name, json } = item
    writeFileSync(resolve(dirPath, `${name}.json`), JSON.stringify(json, null, 2), { encoding: 'utf-8' })
  }
}

/**
 * @description User Need Generate Parse To JSON File
 * @param {SvgNameListType} svgNameList
 * @param {UserOptions} options
 * @returns
 */
const svgToJSON = (svgNameList: SvgNameListType[], options: UserOptions) => {
  const { svgToJSON } = options

  const parseList = parseSvg(svgNameList, options)

  if (svgToJSON) {
    writeJSON(parseList, options)
    info('Begin transform svg to JSON')
  }

  return parseList
}

/**
 * @description Genreate Icons Symbol Name File
 * @param svgNameList
 * @param options
 * @returns
 */
const genGlyphsNameFile = (svgNameList: SvgNameListType[], options: UserOptions) => {
  const { glyphsName, output, symbolId } = options

  if (!glyphsName) return

  info('Start generate glyphs name file.')

  const dirPath = resolve(cwd(), output!)

  const glyphsNameJSON = svgNameList.reduce((prev, next) => {
    const { name } = next
    return { ...prev, [next.name]: `#${getSymbolName(symbolId?.(name), name)}` }
  }, {})

  writeFileSync(resolve(dirPath, `${GLYPHS_NAME_FILE_NAME}.json`), JSON.stringify(glyphsNameJSON, null, 2), { encoding: 'utf-8' })
  success('Generate glyphs name file success.')
}

const genearteSpriteIconFileContent = (string: string) => {
  return `;(function () {
    var svgString = '<svg aria-hidden="true" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">${string}</svg>';
    var insterFn = (target, element) => { 
      element.parentNode.insertBefore(target, element)
    };
    var element = document.createElement('div');
    element.innerHTML = svgString;
    element = element.getElementsByTagName('svg')[0];
    element.setAttribute('aria-hidden', true);
    element.style.position = 'absolute';
    element.style.width = 0;
    element.style.height = 0;
    element.style.overflow = 'hidden';
    document.body.firstChild ? insterFn(element, document.body.firstChild) : document.body.append(element);
    document.body.appendChild(element);
  })(window);`
}

const genSpriteIconsFile = (parseSvgList: ParseSvgType[], options: UserOptions) => {
  info('Start generate sprite icons file.')

  const { symbolId, output, spriteFileName } = options

  const dirPath = resolve(cwd(), output!)

  const matchContent = /(?<=<svg([^>]+)>)[\d\D]*(?=<\/svg>)/g

  const matchViewBox = /viewBox=(["'])([^"])+\1/g

  const container = (name: string, string: string, viewBox = '') => `<symbol id="${name}" ${viewBox}>${string}</symbol>`

  const list: string[] = []

  for (const item of parseSvgList) {
    const { result, name } = item
    const symbolName = symbolId?.(name)
    const content = (result.match(matchContent) || [])[0]
    const viewBox = (result.match(matchViewBox) || [])[0]
    if (content)
      list.push(container(getSymbolName(symbolName, name), removeNewLineChatCode(content), viewBox))
  }

  const result = list.reduce((prev, next) => prev += next, '')

  const fileContent = genearteSpriteIconFileContent(result)

  writeFileSync(resolve(dirPath, `${isString(spriteFileName) ? spriteFileName : SPRITE_ICON_FILE_NAME}.js`), removeNewLineChatCode(fileContent), { encoding: 'utf-8' })

  success('Generate sprite icons file success.')

  return fileContent
}

export const analysisSvg = (options: UserOptions, _userConfig: UserConfig) => {
  let { entry } = options

  const { output, delete: deleteFolder } = options

  const dirPath = resolve(cwd(), output!)

  if (deleteFolder) {
    info('Start deleting the old output file.')
    rmFolderSync(dirPath)
    success('Deleting the old output file success.')
  }

  mkFolderSync(dirPath)

  entry = isArray(entry) ? entry : [entry!]

  const svgNameList = getAllSvgName(entry)

  const parseList = svgToJSON(svgNameList, options)

  genGlyphsNameFile(svgNameList, options)

  const visualModule = genSpriteIconsFile(parseList, options)

  return { visualModule }
}
