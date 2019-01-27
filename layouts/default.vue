<template>
  <div>
    <!-- <nav>
      <ul>
        <li>首页</li>
        <li>首页</li>
        <li>首页</li>
        <li>首页</li>
      </ul>
    </nav> -->
    <my-header />
    <div class="grape" :class="{ fixed: needFixed }">
      <nuxt-link title="首页" :to="{ name: 'index' }" class="logo"></nuxt-link>
    </div>
    <div class="main-wrapper">
      <nuxt class="nuxt" />
      <side-card></side-card>
    </div>
    <my-footer/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MyHeader from '~/components/Header'
import MyFooter from '~/components/Footer'
import SideCard from '~/components/SideCard'

export default {
  components: { MyHeader, MyFooter, SideCard },
  computed: {
    ...mapGetters(['needFixed']),
  },
  head() {
    return {
      title: this.siteInfo.siteName,
    }
  },
  mounted() {
    window.onscroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (650 - scrollTop <= 0) {
        this.$store.commit('updateNeedFixed', true)
      } else {
        this.$store.commit('updateNeedFixed', false)
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
// nav {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   // height: 38px;
//   background-color: rgba(40,42,44,.6);
//   // background-color: rgba(182, 185, 222, 0.6);
//   z-index: 10;
//   ul {
//     margin: 0;
//     margin-left: 100px;
//     padding: 0;
//     list-style: none;
//     li {
//       display: inline-block;
//       width: 120px;
//       height: 38px;
//       line-height: 38px;
//       // float: left;
//       color: #fff;
//       font-size: 16px;
//     }
//   }
// }

.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 0;
  @include mobile {
    padding: 20px 12px;
  }
}

.nuxt {
  width: 700px;
  @include mobile {
    width: 100%;
  }
}

.grape {
  position: absolute;
  top: 650 + 10px;
  left: 0;
  z-index: 2;
  @include mobile {
    display: none;
  }
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
