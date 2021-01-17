import { nodeResolve } from "@rollup/plugin-node-resolve";
import jsdoc from 'rollup-plugin-jsdoc';
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

const input = "./src/index.js";
const input2 = "./src/index.umd.js";
const outputFolder = "./dist/";
const filename = "tooljs";
const exportName = "ToolJS";

export default [
    {
        // UMD Development
        input: input2,
        plugins: [
            nodeResolve(),
            commonjs(),
            jsdoc({
                args: ['-d', '../../docs'],
                config: '../../jsdoc.conf.js'
            }),
            // babel({babelHelpers: "bundled"}),
        ],
        output: {
            file: `${outputFolder}/umd/${filename}.umd.js`,
            format: "umd",
            name: exportName,
            esModule: false,
        },
    },
    // -------------------------------------------------------------------------
    {
        // UMD Production
        input: input2,
        plugins: [
            nodeResolve(),
            terser(),
            commonjs()
            // babel({babelHelpers: "bundled"}),
        ],
        output: {
            file: `${outputFolder}/umd/${filename}.min.js`,
            format: "umd",
            name: exportName,
            esModule: false,
        },
    },
    // -------------------------------------------------------------------------
    // ESM and CJS Development
    {
        input: input,
        plugins: [ nodeResolve() ],
        output: [
            {
                file: `${outputFolder}/esm/${filename}.esm.js`,
                format: "esm",
                exports: "named"
            },
            {
                file: `${outputFolder}/cjs/${filename}.cjs.js`,
                format: "cjs",
                exports: "named"
            },
        ],
    },
    // -------------------------------------------------------------------------
    // ESM and CJS Production
    // {
    //     input: input,
    //     plugins: [nodeResolve(), terser()],
    //     output: [
    //         {
    //             file: `${outputFolder}/esm/${filename}.min.js`,
    //             format: "esm",
    //             exports: "named"
    //         },
    //         {
    //             file: `${outputFolder}/cjs/${filename}.min.js`,
    //             format: "cjs",
    //             exports: "named"
    //         },
    //     ],
    // },
];