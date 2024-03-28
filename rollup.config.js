import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import preserveDirectives from "rollup-plugin-preserve-directives";
import nodeResolve from "@rollup/plugin-node-resolve";
import PeerDepsExternalPlugin from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

export default {
    input: "src/index.ts",
    output: {
        dir: "dist",
        preserveModules: true,
        preserveModulesRoot: "src",
    },
    plugins: [
        preserveDirectives(),
        babel({
            babelHelpers: "bundled",
            presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
            ],
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        }),
        typescript(),
        uglify(),
        postcss({
            plugins: [autoprefixer(), cssnano()],
            inject: false,
            extract: true,
        }),
        nodeResolve({
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        }),
        commonjs(),
        PeerDepsExternalPlugin(),
        terser(),
    ],
    onwarn: function (warning, warn) {
        if (
            warning.code === "MODULE_LEVEL_DIRECTIVE" &&
            warning.message.includes(`"use client"`)
        ) {
            return;
        }
        warn(warning);
    },
};
