import { relative } from 'path'
import favicons from 'favicons'
import { interpolateName, getOptions } from 'loader-utils'
import { normalizePath } from './utils'

const trailingSlash = (path: string) =>
  path.substr(-1) !== '/' ? `${path}/` : path

const HTML_REGEX = new RegExp(/<([^ ]*)\s(.*)>/)

interface IconOptions {
  offset?: number | undefined
  background?: boolean | string | undefined
  mask?: boolean | undefined
  overlayGlow?: boolean | undefined
  ovelayShadow?: boolean | undefined
}

interface FaviconOptions {
  /** Path for overriding default icons path @default '/' */
  path: string
  /** Your application's name @default null */
  appName: string | null
  /**
   * Your application's short_name.
   * @default appName
   */
  appShortName: string | null
  /** Your application's description @default null */
  appDescription: string | null
  /** Your (or your developer's) name @default null */
  developerName: string | null
  /** Your (or your developer's) URL @default null */
  developerURL: string | null
  /** Primary text direction for name, short_name, and description @default 'auto' */
  dir: string
  /** Primary language for name and short_name @default 'en-US' */
  lang: string
  /** Background colour for flattened icons @default '#fff' */
  background: string
  /** Theme color user for example in Android's task switcher @default '#fff' */
  theme_color: string
  /** Style for Apple status bar @default 'black-translucent' */
  appleStatusBarStyle: 'black-translucent' | 'default' | 'black'
  /** Preferred display mode: 'fullscreen', 'standalone', 'minimal-ui' or 'browser' @default 'standalone' */
  display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser'
  /** Default orientation: 'any', 'natural', 'portrait' or 'landscape' @default 'any' */
  orientation: 'any' | 'natural' | 'portrait' | 'landscape'
  /** Set of URLs that the browser considers within your app @default null */
  scope: string
  /** Start URL when launching the application from a device @default '/?homescreen=1' */
  start_url: string
  /** Your application's version string @default '1.0' */
  version: string
  /** Print logs to console? @default false */
  logging: boolean
  /** Determines whether to allow piping html as a file @default false */
  pipeHTML: boolean
  /** Use nearest neighbor resampling to preserve hard edges on pixel art @default false */
  pixel_art: boolean
  /** Browsers don't send cookies when fetching a manifest, enable this to fix that @default false */
  loadManifestWithCredentials: boolean
  /** Determines whether to set relative paths in manifests @default false */
  manifestRelativePaths: boolean
  /**
   * Platform Options:
   * - offset - offset in percentage
   * - background:
   *   * false - use default
   *   * true - force use default, e.g. set background for Android icons
   *   * color - set background for the specified icons
   * - mask - apply mask in order to create circle icon (applied by default for firefox)
   * - overlayGlow - apply glow effect after mask has been applied (applied by default for firefox)
   * - overlayShadow - apply drop shadow after mask has been applied
   */
  icons: Partial<{
    /* Create Android homescreen icon. */
    android: boolean | IconOptions | string[]
    /* Create Apple touch icons. */
    appleIcon: boolean | IconOptions | string[]
    /* Create Apple startup images. */
    appleStartup: boolean | IconOptions | string[]
    /* Create Opera Coast icon. */
    coast: boolean | IconOptions | string[]
    /* Create regular favicons. */
    favicons: boolean | IconOptions | string[]
    /* Create Firefox OS icons. */
    firefox: boolean | IconOptions | string[]
    /* Create Windows 8 tile icons. */
    windows: boolean | IconOptions | string[]
    /* Create Yandex browser icon. */
    yandex: boolean | IconOptions | string[]
  }>
}

export type SiteMetaData = {
  /** Your application's name */
  appName: string | null
  /**
   * Your application's short_name.
   * @default appName
   */
  appShortName: string | null
  /** Your application's description  */
  appDescription: string | null
  /** Background colour for flattened icons @default '#fff' */
  background: string
  /** Theme color user for example in Android's task switcher @default '#fff' */
  theme_color: string
  /** Preferred display mode: 'fullscreen', 'standalone', 'minimal-ui' or 'browser' @default 'standalone' */
  display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser'
  /** Start URL when launching the application from a device @default '/?homescreen=1' */
  start_url: string
  /**  */
  alwaysEmitFull: boolean
  /**  */
  outputPath: 'static/favicons'

  emitFiles: boolean

  prefix?: string

  options?: string
} & FaviconOptions

export default async function loader(this: any, content: Buffer) {
  const callback = this.async()

  try {
    await (async () => {
      const config: SiteMetaData = {
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
        pipeHTML: false,
        manifestRelativePaths: false,
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

            const isImmutable =
              /\[([^:\]]+:)?(hash|contenthash)(:[^\]]+)?]/gi.test(
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, tagName, rest] = HTML_REGEX.exec(tag)
        const items = rest
          .split('" ')
          .map((x) => x.split('='))
          .map(([key, value]) => [
            key,
            value.replace(/^"/, '').replace(/"$/, '')
          ])
          .concat([['key', `${i}`]])

        const attributes = Object.fromEntries(items)

        return `React.createElement("${tagName}", ${JSON.stringify(
          attributes
        )})`
      })

      const result = `import * as React from 'react'
      export default ([${jsx.join(',\r\n')}])
      `

      callback(null, result)
    })()
  } catch (ex) {
    console.error(ex)
  }
}

module.exports.raw = true
