<template>
  <section class="container">
    <img src="/img/logo.png" height="138">
    <h2>博客从另一个域名迁移中，可以先访问以下链接</h2>
    <a href="http://www.choujindeputao.com">抽筋的葡萄</a>
    <br>
    <br>
    <nuxt-link to="/about">关于</nuxt-link>
  </section>
</template>
<script>
export default {
  head() {
    return {
      title: '抽筋的葡萄'
    }
  },
}
</script>
