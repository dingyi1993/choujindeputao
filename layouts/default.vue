<template>
  <div>
    <header></header>
    <div class="grape" :class="{ fixed: grapeFixed }">
      <nuxt-link title="首页" :to="{ name: 'index' }" class="logo"></nuxt-link>
    </div>
    <nuxt/>
    <my-footer/>
  </div>
</template>
<script>
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter
  },
  data() {
    return {
      grapeFixed: false,
    }
  },
  mounted() {
    window.onscroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (650 - scrollTop <= 0) {
        this.grapeFixed = true
      } else {
        this.grapeFixed = false
      }
    }
  },
}
</script>

<style lang="scss" scoped>
// html {
//   font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
//     Roboto, 'Helvetica Neue', Arial, sans-serif;
//   font-size: 16px;
//   word-spacing: 1px;
//   -ms-text-size-adjust: 100%;
//   -webkit-text-size-adjust: 100%;
//   -moz-osx-font-smoothing: grayscale;
//   -webkit-font-smoothing: antialiased;
//   box-sizing: border-box;
// }

// *,
// *:before,
// *:after {
//   box-sizing: border-box;
//   margin: 0;
// }

header {
  height: 650px;
  background-image: url('/images/banner.jpg');
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 800px) {
    height: 300px;
  }
}

.container {
  position: relative;
  padding-top: 30px;
}

.grape {
  position: absolute;
  top: 650 + 10px;
  left: 0;
  z-index: 2;
  // @include mobile {
  //     display: none;
  // }
  &.fixed {
    position: fixed;
    top: 10px;
  }
  .logo {
    display: block;
    height: 70px;
    width: 70px;
    margin-left: -35px;
    background-image: url('/images/logo.png');
    background-position: center;
    background-size: 60%;
    background-repeat: no-repeat;
    transform: rotate(30deg);
    transition: all .8s cubic-bezier(.19,1,.5,1);
    will-change: margin-left, transform;
    &:hover {
      margin-left: 0;
    }
  }
}
</style>
