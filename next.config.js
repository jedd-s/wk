/*
    "@babel/plugin-proposal-class-properties": "^7.16.7",
    "@babel/plugin-proposal-object-rest-spread": "^7.16.7",
    "@babel/plugin-transform-flow-strip-types": "^7.16.7",
    "@babel/preset-flow": "^7.16.7",
    "@motionone/animation": "^10.9.0",
    "@motionone/dom": "^10.12.0",
    "@motionone/easing": "^10.9.0",
    "@motionone/generators": "^10.9.0",
    "@motionone/types": "^10.9.0",
    "@motionone/utils": "^10.12.0",
    "@typescript-eslint/parser": "^5.9.1",
    "autoprefixer": "^10.4.5",
    "babel-plugin-transform-react-remove-prop-types": "^0.4.24",
    "fbjs": "^3.0.0",
    "hey-listen": "^1.0.8",
    "hyphenate-style-name": "^1.0.4",
    "inline-style-prefixer": "^6.0.1",
    "motion": "^10.12.0",
    "next": "^12.1.7-canary.40",
    "postcss": "^8.4.12",
    "postcss-js": "^4.0.0",
    "postcss-value-parser": "^4.2.0",
    "react": "^0.0.0-experimental-229c86af0-20220616",
    "react-dom": "^0.0.0-experimental-229c86af0-20220616",
    "react-error-boundary": "^3.1.4",
    "react-gui": "^0.0.0-c60046238",
    "style-value-types": "^5.1.0",
    "styleq": "^0.1.2",
    "tslib": "^2.4.0"
### Processing

```js
const postcssJs = require('postcss-js')
const autoprefixer = require('autoprefixer')

const prefixer = postcssJs.sync([ autoprefixer ])

const style = prefixer({
  userSelect: 'none'
})

style //=> {
      //     WebkitUserSelect: 'none',
      //        MozUserSelect: 'none',
      //         msUserSelect: 'none',
      //           userSelect: 'none'
      //   }
```


### Compile CSS-in-JS to CSS

```js
const postcss = require('postcss')
const postcssJs = require('postcss-js')

const style = {
  top: 10,
  '&:hover': {
    top: 5
  }
};

postcss().process(style, { parser: postcssJs }).then( (result) => {
  result.css //=> top: 10px;
             //   &:hover { top: 5px; }
})
```


### Compile CSS to CSS-in-JS

```js
const postcss = require('postcss')
const postcssJs = require('postcss-js')

const css  = '--text-color: #DD3A0A; @media screen { z-index: 1; color: var(--text-color) }'
const root = postcss.parse(css)

postcssJs.objectify(root) //=> {
                          //     '--text-color': '#DD3A0A',
                          //     '@media screen': {
                          //       zIndex: '1',
                          //       color: 'var(--text-color)'
                          //     }
                          //   }
```


## API

### `sync(plugins): function`

Create PostCSS processor with simple API, but with only sync PostCSS plugins
support.

Processor is just a function, which takes one style object and return other.


### `async(plugins): function`

Same as `sync`, but also support async plugins.

Returned processor will return Promise.


### `parse(obj): Root`

Parse CSS-in-JS style object to PostCSS `Root` instance.

It converts numbers to pixels and parses
[Free Style] like selectors and at-rules:

```js
{
    '@media screen': {
        '&:hover': {
            top: 10
        }
    }
}
```
*/
// import {readFile, writeFile} from 'fs/promises'
// import autoprefixer from 'autoprefixer'
// import postcss from 'postcss'
// import postcssJs from 'postcss-js'
// const prefixer = postcssJs.sync([autoprefixer])

// async function makeCss() {
//     const css = await readFile('resources/apple/swiftui.css', {encoding: 'utf-8'})
//     const result = await postcss([autoprefixer]).process(css)

//     const root = postcss.parse(css)

//     const object = postcssJs.objectify(root)

//     const Styles = Object.entries(object).reduce(
//         (acc, c) => {
//             // const { classNames, vars } = acc

//             const [name, rules] = c

//             const vars = {}
//             const classNames = {}

//             const props = Object.keys(rules)

//             if (name.startsWith('.')) {
//                 classNames[
//                     name
//                         .slice(1)
//                         .split('-')
//                         .map((s, i) => (i == 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
//                         .join('')
//                 ] = name.slice(1)
//                 // vars.
//             } else {
//                 props.forEach((rule) => {
//                     if (rule.startsWith('--')) {
//                         vars[
//                             rule
//                                 .slice(2)
//                                 .split('-')
//                                 .map((s, i) => (i == 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
//                                 .join('')
//                         ] = `var(${rule})`
//                     }
//                 })
//             }

//             // if ()
//             return {
//                 vars: {
//                     ...acc.vars,
//                     ...vars,
//                 },
//                 classNames: {
//                     ...acc.classNames,
//                     ...classNames,
//                 },
//             }
//         },
//         {vars: {}, classNames: {}}
//     )

//     const stylesEx = 'export const system = ' + JSON.stringify({...Styles.vars, ...Styles.classNames}, null, 2)
//     // console.log(Styles)
//     // console.log(object)
//     await writeFile('resources/apple/swiftui.js', stylesEx + '\n\nexport const cssText = `\n' + result + '`', {
//         encoding: 'utf-8',
//     })

//     // console.log(css)
// }

// const babelConfig = {
//     presets: [
//         [
//             'next/babel',
//             {
//                 'transform-runtime': { loose: true },
//                 'styled-jsx': {},
//                 'class-properties': { loose: true },
//                 'preset-env': {
//                     modules: 'auto', // false turns off code splitting
//                     loose: true,
//                 },
//                 'preset-react': {
//                     loose: true,
//                 },
//             },
//         ],
//         '@babel/preset-flow',
//     ],
//     plugins: [
//         '@babel/plugin-transform-flow-strip-types',
//         [
//             '@babel/plugin-proposal-object-rest-spread',
//             { useBuiltIns: true, loose: true },
//         ],
//     ],
// }

// makeCss()
/**
 * @type {import('./node_modules/next/config')}
 */
module.exports = {
    devIndicators: {
        autoPrerender: false,
        buildActivity: false,
        /** Position of "building..." indicator in browser */
        // buildActivityPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    },
    // pageExtensions: ['js', 'ts', 'server.js', 'server.jsx', 'jsx'], // .tsx won't be treat as page,
    // pageExtensions: ['js'],

    experimental: {
        reactRoot: true,
        concurrentFeatures: true,
        legacyBrowsers: false,
        runtime: 'edge',
        // runtime: 'nodejs',
        esmExternals: true,
        browsersListForSwc: true,
        serverComponents: true,
        newNextLinkBehavior: true,
        // runtime: 'experimental-edge',
    },
    webpack(webpackConfig, options) {
        const { dir, dev, config, isServer, webpack } = options
        // console.log(object)

        // console.log(babel.options)
        // config
        webpackConfig.plugins.push(
            new webpack.DefinePlugin({
                __DEV__: JSON.stringify(dev),
                __CLIENT__: JSON.stringify(!isServer),
                __SERVER__: JSON.stringify(isServer),
            }),
        )

        const jsxRuntime = require.resolve('react/jsx-runtime')
        const jsxDevRuntime = require.resolve('react/jsx-dev-runtime')

        webpackConfig.resolve.alias = {
            ...(webpackConfig.resolve.alias || {}),
            //   'react/jsx-runtime.js': jsxRuntime,
            'react/jsx-runtime': jsxRuntime,
            //   'react/jsx-dev-runtime.js': jsxDevRuntime,
            'react/jsx-dev-runtime': jsxDevRuntime,
            //   react: require.resolve('react'),
            //   'react-dom': require.resolve('react-dom'),
        }

        const [first, second, ...rest] = webpackConfig.module.rules

        // console.log(webpackConfig.module.rules),

        // oneOfJSRules.splice(3, 0, {
        // })

        // config.module.rules.push({
        //     test: /\.js/,
        //     use: [
        //         options.defaultLoaders.babel,
        //         {
        //             loader: options.defaultLoaders.babel.loader,
        //             options: {

        //             },
        //         },
        //     ],
        // })
        // alias['react/jsx-runtime'] = 'react-18/jsx-runtime.js'

        // // Use react 18
        // alias['react'] = 'react-18'
        // alias['react-dom/server.browser'] = 'react-dom/server.'
        // alias['react-dom/server'] = 'react-dom-18/server'

        return webpackConfig
    },
}
