import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import cssModules from 'postcss-modules';
import { minify } from 'uglify-es';
import camelcaseKeys from 'camelcase-keys';

const cssExportMap = {};

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
    input  : 'lib/app/index.jsx',
    output : {
        file      : 'build/app.js',
        format    : 'iife',
        sourcemap : true
    },
    plugins : [
        resolve({
            extensions : ['.js', '.json', '.jsx']
        }),
        commonjs({
            include : [
                'node_modules/**'
            ],
            exclude : [
                'node_modules/process-es6/**'
            ],
            namedExports : {
                'node_modules/react/index.js' : ['Children', 'Component', 'createElement']
            }
        }),
        postcss({
            plugins : [
                cssModules({
                    getJSON(id, exportTokens) {
                        cssExportMap[id] = camelcaseKeys(exportTokens);
                    }
                })
            ],
            getExportNamed : true,
            getExport(id) {
                return cssExportMap[id];
            }
        }),
        replace({
            // This is needed to fix React assuming the browser has `process`
            'process.env.NODE_ENV' : JSON.stringify(production ? 'production' : 'development')
        }),
        babel({
            babelrc : false,
            exclude : 'node_modules/**',
            presets : ['react']
        }),
        production && uglify({}, minify)
    ]
};
