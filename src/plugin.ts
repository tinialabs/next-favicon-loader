import { SiteMetaData } from '.'

const path = require('path')

export interface PluginProps {
  /** The object containing the site meta data */
  manifest: SiteMetaData
}

/**
 * This is a Next.js plugin that uses a single favicon image to generate all icons and manifest files
 * needed for a modern web app across multiple platforms
 */
module.exports = function nextFaviconLoader(pluginConfig: PluginProps) {
  return (nextConfig) => ({
    ...nextConfig,
    webpack: (config, ...rest) => {
      const imageLoaderIndex = config.module.rules.findIndex(
        (f) => f.loader && f.loader.toString() === 'next-image-loader'
      )

      config.module.rules.splice(imageLoaderIndex, 1, {
        ...config.module.rules[imageLoaderIndex],
        resourceQuery: {
          not: [
            ...(config.module.rules[imageLoaderIndex].resourceQuery?.not || []),
            /favicon/
          ]
        }
      })

      config.module.rules.push({
        ...config.module.rules[imageLoaderIndex],
        type: undefined,
        loader: undefined,
        options: undefined,
        resourceQuery: /favicon/,
        use: [
          {
            loader: path.resolve(__dirname, './index.js'),
            options: pluginConfig.manifest
          }
        ]
      })

      return nextConfig.webpack(config, ...rest)
    }
  })
}
