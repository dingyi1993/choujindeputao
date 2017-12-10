module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '抽筋的葡萄',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '抽筋的葡萄' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    { src: '~assets/style/main.less', lang: 'less' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#09c' }
}
