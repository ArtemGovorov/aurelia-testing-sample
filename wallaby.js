const wallabyWebpack = require('wallaby-webpack');
const path = require('path');
const AureliaPlugin = require('aurelia-webpack-plugin').AureliaPlugin;
const DefinePlugin = require('webpack').DefinePlugin;

module.exports = function (wallaby) {
  const wallabyPostprocessor = wallabyWebpack({
    entryPatterns: ['test/unit/setup.js', 'test/unit/**/*.spec.js'],
    resolve: {
      modules: [
        path.join(wallaby.projectCacheDir, 'src')
      ],
      alias: {}
    },
    plugins: [
      new DefinePlugin({AURELIA_WEBPACK_2_0: undefined}),
      new AureliaPlugin()
    ]
  });

  return {
    files: [
      {pattern: 'src/**/*.js', load: false},
      {pattern: 'test/unit/setup.js', load: false}
    ],
    tests: [
      {pattern: 'test/unit/**/*.spec.js', load: false}
    ],
    env: {
      kind: 'electron'
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        'presets': [
          'es2015',
          'stage-1'
        ],
        'plugins': [
          'transform-regenerator',
          'transform-async-generator-functions',
          'syntax-async-functions',
          'transform-decorators-legacy',
          'transform-class-properties'
        ]
      })
    },
    postprocessor: wallabyPostprocessor,
    setup: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
