const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/font-awesome.min.css' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#09c' },

  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    { src: '~/assets/style/main.scss', lang: 'scss' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '~/plugins/vue-markdown'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    },
    // vendor: ['~/plugins/vue-markdown'],
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'page',
        path: '/page/:page?',
        component: 'pages/index.vue'
      })
    }
  }
}
