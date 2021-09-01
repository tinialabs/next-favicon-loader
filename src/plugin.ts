import path from 'path'
import { SiteMetaData } from '.'

export interface PluginProps {
  /** The object containing the site meta data */
  meta: SiteMetaData
  /** The absolute filepath including extension of the base favicon used for generating */
  path: string
}

/**
 * This is a Next.js plugin that uses a single favicon image to generate all icons and manifest files
 * needed for a modern web app across multiple platforms
 */
module.exports = function nextFaviconLoader(pluginConfig: PluginProps) {
  return (nextConfig) => ({
    ...nextConfig,
    webpack: (config, ...rest) => {
      config.module.rules.push({
        // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
        test: new RegExp(
          (path.basename(pluginConfig.path).replace('.', '\\.') + '$', 'i')
        ),
        include: [path.dirname(pluginConfig.path)],
        use: [
          {
            loader: path.resolve(__dirname, './index.js'),
            options: pluginConfig.meta
          }
        ]
      })

      return nextConfig.webpack(config, ...rest)
    }
  })
}
