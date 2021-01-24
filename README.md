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

Create a site properties file with a manifest section in yaml

``` yaml
// content/theme/site.yml
---
title: Novela by Tinia Labs
manifest:
  appName: Novela by Narative
  appShortName: Novela
  appDescription: Novela by Narative
  start_url: /
  background: "#fff"
  theme_color: "#fff"   
  display: standalone
  alwaysEmitFull: false
```

## Options
| Option | Default | Type | Description |
| :--- | :------: | :--: | :---------- |
| sitePropsYaml | './content/theme/site.yml'| string | The file containing the site meta data |
| contentThemeFolder |'./content/theme' | string |The folder where theme files including favicon are kept |
| faviconFile | [favicon.png'| string|  The filename including extension of the base favicon used for generating |

## Usage

You can now simply create a single 512x512 or 1024x1024 png file of your favicon, require it in at least one place on both client and server side logic in your Next.js app, and in Dev mode a simple favicon will be set (with updating hashname so you 
can see the updates on refresh) and in production builds a full set of icons and browser manifest will be generated and the associated HTML react components returned 

### Example on client side 
``` js
// pages/_app.tsx
require('./content/favicon.png')
// .. rest of _app file goes here
```

### Example on server side 
``` js
/// pages/_document.tsx

import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render(): JSX.Element {
    const Meta = require('@/content/theme/favicon.png')

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
      "@/content/*": [
        "./content/*"
      ]
```

## License

Licensed under the [MIT](https://github.com/tinialabs/next-favicon-loader/blob/master/LICENSE) license.

© Copyright Guy Barnard and Tinia Labs contributors