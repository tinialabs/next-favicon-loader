import { relative } from 'path'
import favicons from 'favicons'
import { interpolateName, getOptions } from 'loader-utils'
import { normalizePath } from './utils'

const trailingSlash = (path: string) =>
  path.substr(-1) !== '/' ? `${path}/` : path

const HTML_REGEX = new RegExp(/<([^ ]*)\s(.*)>/)

export default async function loader(this: any, content: Buffer) {
  const callback = this.async()
  void (async () => {
    const config: any = {
      outputPath: 'static/favicons',
      path: '/_next/static/favicons', // Path for overriding default icons path. `string`
      emitFiles: true,
      alwaysEmitFull: false,
      appName: null, // Your application's name. `string`
      appShortName: null, // Your application's short_name. `string`. Optional. If not set, appName will be used
      appDescription: null, // Your application's description. `string`
      developerName: null, // Your (or your developer's) name. `string`
      developerURL: null, // Your (or your developer's) URL. `string`
      dir: 'auto', // Primary text direction for name, short_name, and description
      lang: 'en-US', // Primary language for name and short_name
      background: '#fff', // Background colour for flattened icons. `string`
      theme_color: '#fff', // Theme color user for example in Android's task switcher. `string`
      appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
      display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
      orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
      scope: '/', // set of URLs that the browser considers within your app
      start_url: '/', // Start URL when launching the application from a device. `string`
      version: '1.0', // Your application's version string. `string`
      logging: false, // Print logs to console? `boolean`
      pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
      loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
      icons: {
        android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        coast: false, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        firefox: false, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        windows: false, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        yandex: false // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      },
      ...getOptions(this)
    }

    const prefix =
      config.prefix &&
      trailingSlash(
        interpolateName(this, config.prefix as string, {
          context: this.rootContext,
          content: JSON.stringify([content, config.options])
        })
      )

    const outputPath = config.outputPath
      ? trailingSlash(config.outputPath as string)
      : prefix

    const isFull =
      process.env.NODE_ENV === 'production' || config.alwaysEmitFull

    let tags: string[]

    if (!isFull) {
      const url = interpolateName(this, '[name].[hash].[ext]', {
        context: this.rootContext,
        content
      })

      this.emitFile(outputPath + url, content, null, {
        isImmutable: true,
        sourceFilename: normalizePath(
          relative(this.rootContext, this.resourcePath)
        )
      })

      tags = [`<link rel="icon" href="${config.path}/${url}">`]
    } else {
      // Generate icons
      const { html, images, files } = await favicons(content, config)
      tags = html

      const assets = images.map(({ name, contents }) => ({
        name: outputPath + name,
        contents: contents
      }))

      if (typeof config.emitFiles === 'undefined' || config.emitFiles) {
        assets.forEach(({ name, contents }) => {
          const assetInfo: any = {}

          let normalizedName = name

          const idx = normalizedName.indexOf('?')

          if (idx >= 0) {
            normalizedName = normalizedName.substr(0, idx)
          }

          const isImmutable = /\[([^:\]]+:)?(hash|contenthash)(:[^\]]+)?]/gi.test(
            normalizedName
          )

          if (isImmutable === true) {
            assetInfo.immutable = true
          }

          assetInfo.sourceFilename = normalizePath(
            relative(this.rootContext, this.resourcePath)
          )

          this.emitFile(name, contents, null, assetInfo)
        })

        files.forEach(({ name, contents }) => {
          this.emitFile(outputPath + name, contents, null)
        })
      }
    }

    const jsx = tags.map((tag, i) => {
      const [_, tagName, rest] = HTML_REGEX.exec(tag)
      const items = rest
        .split('" ')
        .map((x) => x.split('='))
        .map(([key, value]) => [key, value.replace(/^"/, '').replace(/"$/, '')])
        .concat([['key', `${i}`]])

      const attributes = Object.fromEntries(items)

      return `React.createElement("${tagName}", ${JSON.stringify(attributes)})`
    })

    const result = `const React = require('react')
    module.exports = ([${jsx.join(',\r\n')}])
      `

    callback(null, result)
  })()
}

module.exports.raw = true
