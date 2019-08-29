const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .version();


let base_path = 'resources/js/'
mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, base_path),
            '@api': path.resolve(__dirname, base_path + 'api/'),
            '@helpers': path.resolve(__dirname, base_path + 'helpers/'),
            '@mixins': path.resolve(__dirname, base_path + 'mixins/'),
            '@pages': path.resolve(__dirname, base_path + 'pages/'),
            '@router': path.resolve(__dirname, base_path + 'router/'),
            '@store': path.resolve(__dirname, base_path + 'store/'),
            '@util': path.resolve(__dirname, base_path + 'util/'),
            '@compts': path.resolve(__dirname, base_path + 'components'),
            '@back': path.resolve(__dirname, base_path + 'components/backend/'),
            '@front': path.resolve(__dirname, base_path + 'components/frontend/'),
            '@pback': path.resolve(__dirname, base_path + 'components/backend/partials/'),
            '@pfront': path.resolve(__dirname, base_path + 'components/frontend/partials/'),
            '@widgets': path.resolve(__dirname, base_path + 'widgets/'),
        },
    },
});

// mix.webpackConfig({
//     module: {
//         rules: [
//             {
//                 test: /\.s(c|a)ss$/,
//                 use: [
//                     'vue-style-loader',
//                     'css-loader',
//                     {
//                         loader: 'sass-loader',
//                         options: {
//                             implementation: require('sass'),
//                             fiber: require('fibers'),
//                             indentedSyntax: false // optional
//                         }
//                     }
//                 ]
//             }
//         ]
//     }
// })


// mix.browserSync('http://localhost:8000');

