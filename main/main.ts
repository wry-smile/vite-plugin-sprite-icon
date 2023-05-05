import type { Plugin } from 'vite'
import type { UserOptions } from './types'
import { analysisSvg } from './analysis'
import { DEFAULT_OPTIONS } from './const'
export const spriteIcon = (options: UserOptions) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  analysisSvg(options)
  return {
    name: '@wry-smile/vite-plugin-sprite-icon',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              attrs: {},
              children: 'window._iconfont_svg_string_3765188=\'<svg><symbol id="icon-skintest" viewBox="0 0 1024 1024"><path d="M715.872 473.392c-15.472-112.736-103.616-196.864-207.36-196.864-103.68 0-191.872 84.064-207.344 196.864h414.72z m-463.072 0l0.192-1.712c16.72-138.08 125.376-243.152 255.52-243.152 130.752 0 239.728 105.984 255.744 244.864h45.488a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H208a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h44.8z m486.656 117.92c13.888 3.472 12.352 13.472 10.912 18.208-34.8 113.696-131.088 192.912-242.08 192.912-110.144 0-205.856-78.016-241.312-190.432-1.536-4.896-4.64-14.432 10.832-18.848l16.528-4.32c15.52-3.968 17.392 5.52 18.864 10.096 29.728 92.56 107.376 155.504 195.088 155.504 88 0 165.824-63.36 195.36-156.304 1.536-4.864 3.616-14.88 19.936-10.832l15.872 4.032z m54.624 84.16h16a16 16 0 0 1 16 16v125.568a16 16 0 0 1-16 16h-125.552a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h93.552v-93.568a16 16 0 0 1 16-16z m-570.08 0a16 16 0 0 1 16 16v93.568h93.568a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H208a16 16 0 0 1-16-16v-125.568a16 16 0 0 1 16-16h16z m570.08-325.92a16 16 0 0 1-16-16V240h-93.552a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h125.552a16 16 0 0 1 16 16v125.568a16 16 0 0 1-16 16h-16z m-570.08 0h-16a16 16 0 0 1-16-16V208a16 16 0 0 1 16-16h125.568a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H240v93.568a16 16 0 0 1-16 16zM591.168 648.32c10.224 11.68 1.04 18.976-3.84 21.648-21.648 11.824-49.536 18.384-78.96 18.384-28.912 0-56.368-6.336-77.872-17.792-5.12-2.736-14.08-9.36-4.32-22.336l10.528-14.016c7.824-11.088 16.048-5.984 20.736-3.84 13.648 6.224 31.584 9.984 50.928 9.984 18.928 0 36.496-3.6 50-9.568 5.168-2.288 12.512-7.664 22.816 4.384l9.984 13.152z"  ></path></symbol></svg>\',function(n){var t=(t=document.getElementsByTagName("script"))[t.length-1],e=t.getAttribute("data-injectcss"),t=t.getAttribute("data-disable-injectsvg");if(!t){var a,o,i,c,d,s=function(t,e){e.parentNode.insertBefore(t,e)};if(e&&!n.__iconfont__svg__cssinject__){n.__iconfont__svg__cssinject__=!0;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(t){console&&console.log(t)}}a=function(){var t,e=document.createElement("div");e.innerHTML=n._iconfont_svg_string_3765188,(e=e.getElementsByTagName("svg")[0])&&(e.setAttribute("aria-hidden","true"),e.style.position="absolute",e.style.width=0,e.style.height=0,e.style.overflow="hidden",e=e,(t=document.body).firstChild?s(e,t.firstChild):t.appendChild(e))},document.addEventListener?~["complete","loaded","interactive"].indexOf(document.readyState)?setTimeout(a,0):(o=function(){document.removeEventListener("DOMContentLoaded",o,!1),a()},document.addEventListener("DOMContentLoaded",o,!1)):document.attachEvent&&(i=a,c=n.document,d=!1,r(),c.onreadystatechange=function(){"complete"==c.readyState&&(c.onreadystatechange=null,l())})}function l(){d||(d=!0,i())}function r(){try{c.documentElement.doScroll("left")}catch(t){return void setTimeout(r,50)}l()}}(window);',
              injectTo: 'head',
            },
          ],
        }
      },
    },
  } as Plugin
}

