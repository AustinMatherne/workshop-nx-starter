'use strict';

const path = require('path');
const webpack = require('webpack');
const wallabyWebpack = require('wallaby-webpack');
const compilerOptions = Object.assign(
  { useStandardDefaults: true },
  require('./tsconfig.json').compilerOptions,
  require('./tsconfig.spec.json').compilerOptions
);

module.exports = wallaby => {
  const webpackPostprocessor = wallabyWebpack({
    entryPatterns: ['wallabyTest.js', '@(apps|libs)/**/*.spec.js'],
    module: {
      rules: [
        { test: /\.css$/, loader: ['raw-loader', 'css-loader'] },
        { test: /\.html$/, loader: 'raw-loader' },
        {
          test: /\.ts$/,
          loader: '@ngtools/webpack',
          include: /node_modules/,
          query: { tsConfigPath: 'tsconfig.json' }
        },
        { test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/ },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.styl$/, loaders: ['raw-loader', 'stylus-loader'] },
        { test: /\.less$/, loaders: ['raw-loader', 'less-loader'] },
        { test: /\.scss$|\.sass$/, loaders: ['raw-loader', 'sass-loader'] },
        { test: /\.(jpg|png)$/, loader: 'url-loader?limit=128000' }
      ]
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    },
    plugins: [
      new webpack.ProvidePlugin({
        Quill: 'quill'
      })
    ],
    resolve: {
      extensions: ['.js', '.ts'],
      modules: [path.join(wallaby.projectCacheDir, 'apps'), path.join(wallaby.projectCacheDir, 'libs'), 'node_modules'],
      alias: { '@tuskdesk-suite': path.join(wallaby.projectCacheDir, 'libs') }
    }
  });

  return {
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },
    env: {
      kind: 'chrome'
    },
    filesWithNoCoverageCalculated: [
      'wallabyTest.ts',
      '**/mocks/**',
      '**/test/**',
      '**/*.module.ts',
      'apps/*/src/*',
      'apps/*/src/environments/*'
    ],
    files: [
      { pattern: 'wallabyTest.ts', load: false },
      {
        pattern: '@(apps|libs)/**/*.@(css|html|json|less|sass|scss|styl|svg|ts)',
        load: false
      },
      { pattern: '@(apps|libs)/**/*.d.ts', ignore: true },
      { pattern: '@(apps|libs)/**/*.spec.ts', ignore: true },
      { pattern: '@(apps|libs)/**/e2e/**', ignore: true }
    ],
    tests: [{ pattern: '@(apps|libs)/**/*.spec.ts', load: false }, { pattern: '@(apps|libs)/**/e2e/**', ignore: true }],
    postprocessor: webpackPostprocessor,
    setup: () => {
      window.__moduleBundler.loadTests();
    },
    testFramework: 'jasmine'
  };
};
