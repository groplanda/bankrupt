let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.setPublicPath('./themes/insolvent/assets');
mix.js('./themes/insolvent/assets/src/app.js', 'dist/js')
  .sass('./themes/insolvent/assets/src/app.scss', 'dist/css')
  .options({
    postCss: [
      require('postcss-url'),
      require('autoprefixer')({
        overrideBrowserslist: ['last 6 versions'],
            grid: true
      }),
      require('cssnano')({
          preset: ['default', {
              discardComments: {
                  removeAll: true,
              },
          }]
      }),
    ]
  })
  .browserSync({
    proxy: 'bankrupt.loc',
    host: 'bankrupt.loc',
    notify: false,
    files: [
      "./themes/insolvent/assets/dist/css/*.css",
      "./themes/insolvent/assets/dist/js/*.js",
      "./themes/insolvent/**/*.htm",
    ]
});