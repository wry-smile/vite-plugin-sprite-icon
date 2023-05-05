import { readFileSync, readdirSync } from 'fs'
import { format } from 'path'
import type { XmlDocument } from '@rgrove/parse-xml'
import { parseXml } from '@rgrove/parse-xml'
import { isArray } from '@wry-smile/utils-is'
import type { UserOptions } from './types'
import { SVG_EXT, error, isSvg } from './utils'

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

const parseSvg = (nameList: SvgNameListType[]): ParseSvgType[] => {
  const parseList: ParseSvgType[] = []

  for (const item of nameList) {
    const { name, path } = item
    const _path = format({ dir: path, name, ext: SVG_EXT })
    const result = readFileSync(_path, { encoding: 'utf-8' })
    const parseJSON = parseXml(result)
    parseList.push({ result, json: parseJSON, path, name })
  }

  return parseList
}

export const write = (list: ParseSvgType[], options: UserOptions) => {
  const { output } = options
  for (const item of list) {
    const { name, path, json } = item
  }
}

export const analysisSvg = (options: UserOptions) => {
  let { entry } = options
  entry = isArray(entry) ? entry : [entry!]

  const svgNameList = getAllSvgName(entry)

  const parseList = parseSvg(svgNameList)

  console.log(parseList)
}
