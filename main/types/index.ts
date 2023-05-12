export interface UserOptions {

  /**
   * @description Set SvgIcon File Entry Location!
   * @default
   */
  entry?: string | string[]

  /**
   * @description Set The Location For Storing Generated File.
   * @defaultValue /src/assets
   */
  output?: string

  /**
   * @description Automactically Inject Into Index.html.
   */
  autoInject?: boolean

  /**
   * @description Svg File To JSON File.
   */
  svgToJSON?: boolean

  /**
   * @description Generate Glyphs Name.
   */
  glyphsName?: boolean

  /**
   * @description symbol
   * @returns string
   */
  symbolId?: (name: string) => string

  /**
   * @description Genreate Sprite Icon File Name
   * @default sprite.icon
   */
  spriteFileName?: string

  /**
   * @description Delete Old Output Folder
   */
  delete?: boolean
}
