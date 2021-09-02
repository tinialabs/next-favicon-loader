# next-favicon-loader [![npm version](https://badgen.net/npm/v/next-favicon-loader)](https://www.npmjs.com/package/next-favicon-loader) [![license](https://badgen.net/github/license/tinialabs/next-favicon-loader)](https://github.com/tinialabs/next-favicon-loader/blob/master/LICENSE) [![downloads](https://badgen.net/npm/dt/next-favicon-loader)](https://www.npmjs.com/package/next-favicon-loader)

Features:
- **Favicon generator** Uses the `favicons` package to generate favicons and manifests on all required platforms
- **Yaml config** Put all your site config in one place in a site.yml file in your content folder
- **Single image input** Generates everything off a single image and the site meta data for description, colors, etc.
- **Webpack loader** Simple installation as Next.js plugin automatically installs a dedicated webpack loader for the favicon
- **Generates HTML helmet data** Returns the HTML header links for all generated icons and manifest info 
- **React generator** The HTML header links are already React elements ready for you to insert using `react-helmlet` or `next/head`

## Table of contents

- [Installation](#installation)
- [Options](#options)
- [Usage](#usage)
- [License](#license)

## Installation

```
npm install next-favicon-loader next-compose-plugins
```

Add the plugin with [`next-compose-plugins`](https://github.com/cyrilwanner/next-compose-plugins) to your Next.js configuration:

```javascript
// next.config.js
const withPlugins = require("next-compose-plugins");
const nextFaviconLoader = require("next-favicon-loader");

module.exports = withPlugins([
  nextFaviconLoader
  // your other plugins here
]);
```

Create a site properties file that includes a manifest section in yaml

``` yaml
// docs/_config/index.yml
---
:
manifest:
  appName: Novela by Narative
  appShortName: Novela
  appDescription: Novela by Narative
  start_url: /
  background: "#fff"
  theme_color: "#fff"   
  display: standalone
  alwaysEmitFull: false
:
```

## Options
| Option |  Type | Description |
| :--- | :--: | :---------- |
| meta | object | The contents of the file containing the site meta data |
| file | string |The folder where theme files including favicon are kept |
| file | string |The absolute filename including path and extension of the base favicon used for generating |

## Usage

You can now simply create a single 512x512 or 1024x1024 png file of your favicon, require it in at least one place on both client and server side logic in your Next.js app with a special `?favicon` resourceQuery, and in Dev mode a simple favicon will be set (with updating hashname so you can see the updates on refresh) and in production builds a full set of icons and browser manifest will be generated and the associated HTML react components returned 

### Example on client side 
``` js
// pages/_app.tsx
import '@/docs/assets/favicon.png?favicon'
// .. rest of _app file goes here
```

### Example on server side 
``` js
/// pages/_document.tsx

import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Meta from '@/docs/assets/favicon.png?favicon'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>{Meta}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

``` json
// tsconfig.json
    "baseUrl": ".",
    "paths": {
      "@/docs/*": [
        "./docs/*"
      ]
```

``` ts
// global.d.ts
type FaviconData = Array<any>

declare module '*.png?favicon' {
  const content: FaviconData

  export default content
}
```

## License

Licensed under the [MIT](https://github.com/tinialabs/next-favicon-loader/blob/master/LICENSE) license.

© Copyright Guy Barnard and Tinia Labs contributors