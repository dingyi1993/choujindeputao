<template>
  <section class="container">
    <p>using nuxt.js stars: {{ stars }}</p>
    <nuxt-link class="button" to="/">go home</nuxt-link>
  </section>
</template>
<script>
export default {
  async asyncData({ req }) {
    const res = await fetch('https://api.github.com/repos/nuxt/nuxt.js')
    const json = await res.json()
    return {
      stars: json.stargazers_count,
      name: req ? 'server' : 'client'
    }
  },
  head() {
    return {
      title: 'About Page'
    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
