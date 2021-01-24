const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')


/**
 * @typedef PluginProps
 * @type {object}
 * @property {string} sitePropsYaml - The file containing the site meta data ['./content/theme/site.yml']
 * @property {string} contentThemeFolder - The folder where theme files including favicon are kept ['./content/theme']
 * @property {string} faviconFile - The filename including extension of the base favicon used for generating ['favicon.png']
 */

/**
 * This is a Next.js plugin that uses a single favicon image to generate all icons and manifest files
 * needed for a modern web app across multiple platforms
 * @param {PluginProps} nextConfig
 */
module.exports = function nextFaviconLoader(nextConfig = {}) {

  mergeDefaults(nextConfig, {
    sitePropsYaml: './content/theme/site.yml',
    contentThemeFolder: './content/theme',
    faviconFile: 'favicon.png',
  })

  const { manifest } = yaml.safeLoad(
    fs.readFileSync(
      path.resolve(process.cwd(), nextConfig.sitePropsYaml),
      'utf8'
    )
  )

  return Object.assign({}, nextConfig, {
    webpack: (config, ...rest) => {
      config.module.rules.push({
        test: new RegExp((nextConfig.faviconFile.replace('.', '\\.')) + "$", "i"),
        include: [path.resolve(process.cwd(), nextConfig.contentThemeFolder)],
        use: [
          {
            loader: path.resolve(__dirname, './dist/index.js'),
            options: manifest
          }
        ]
      })

      return nextConfig.webpack(config, ...rest)
    },
  })

}


const mergeDefaults = function (opts, defaults) {
  for (i in defaults) {
    if (!(i in opts)) {
      opts[i] = defaults[i];
    }
  }
  return opts;
}