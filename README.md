# @wry-smile/vite-plugin-sprite-icon

## Usage

### Step 1

```ts
// vite.config.ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { spriteIcon } from '@wry-smile/vite-plugin-sprite-icon'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // ...,
    spriteIcon({
      entry: resolve('./src/assets/icons'),
      output: resolve('./src/assets/sprite')
    }),
  ],
})

```


### Step 2

```ts
// import virtual module
// virtual module default open
// main.ts
import 'virtual:sprite-icon-module'
```
