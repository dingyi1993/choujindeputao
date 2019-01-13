import qs from 'qs'

export default ({ $axios, redirect }) => {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
      config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      console.log('400:' + error)
    }
  })
}