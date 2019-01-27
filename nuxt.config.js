const pkg = require('./package')

const axiosConfig = {
  baseURL: 'http://127.0.0.1:7001',
} // See https://github.com/nuxt-community/axios-module#options

if (process.env.NODE_ENV === 'production') {
  axiosConfig.browserBaseURL = '/'
}

module.exports = {
  // mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],

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
    { src: '~/assets/style/main.scss', lang: 'scss' },
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '~/plugins/vue-markdown'
    '~/plugins/axios',
    '~/plugins/global',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-fontawesome',
  ],
  /*
  ** Axios module configuration
  */
  axios: axiosConfig,
  styleResources: {
    scss: ['./assets/style/variables/index.scss', './assets/style/mixins/index.scss'],
  },
  fontawesome: {
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['far'],
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab'],
      }
    ]
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
