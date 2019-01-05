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
    <header></header>
    <div class="grape" :class="{ fixed: grapeFixed }">
      <nuxt-link title="首页" :to="{ name: 'index' }" class="logo"></nuxt-link>
    </div>
    <div class="main-wrapper">
      <nuxt />
      <div class="side-card-wrapper">
        <div class="side-card" :class="{ fixed: grapeFixed }">
          <transition name="page" mode="out-in">
            <ul v-if="isBlog">
              <li
                v-for="item in [{ key: 'toc', name: '文章目录' }, { key: 'summary', name: '站点概览' }]"
                :key="item.key"
                :class="{ active: currentSideCard === item.key }"
                @click="$store.commit('updateCurrentSideCard', item.key)"
              >{{ item.name }}</li>
            </ul>
            <!-- 下面的 div 是个 hack，为了触发 transition 的 mode="out-in" -->
            <div v-else></div>
          </transition>
          <keep-alive>
            <transition name="page" mode="out-in">
              <div v-if="currentSideCard === 'summary' || !isBlog" class="about-site">
                <div class="header-img"></div>
                <p>抽筋的葡萄</p>
                <nav>
                  <nuxt-link :to="{ name: 'about' }">
                    <span>{{ siteInfo.blogCount }}</span>
                    <span>日志</span>
                  </nuxt-link>
                  <!-- <nuxt-link :to="{ name: 'about' }">
                    <span>42</span>
                    <span>分类</span>
                  </nuxt-link> -->
                  <nuxt-link :to="{ name: 'about' }">
                    <span>{{ siteInfo.tagCount }}</span>
                    <span>标签</span>
                  </nuxt-link>
                </nav>
                <div class="find-me">
                  <a class="github-btn" href="https://github.com/dingyi1993" title="github" target="_blank" style="font-size: 26px;"><i class="fa fa-github"></i></a>
                </div>
              </div>
              <blog-toc v-else class="toc"></blog-toc>
            </transition>
          </keep-alive>
        </div>
      </div>
    </div>
    <my-footer/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MyFooter from '~/components/Footer'
import BlogToc from '~/components/blog/Toc/index'

export default {
  components: { MyFooter, BlogToc },
  data() {
    return {
      grapeFixed: false,
    }
  },
  computed: {
    ...mapGetters(['currentSideCard', 'siteInfo']),
    isBlog() {
      return this.$route.name === 'blog-id'
    },
  },
  head() {
    return {
      title: '抽筋的葡萄',
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

header {
  height: 650px;
  background-image: url('/images/banner.jpg');
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 800px) {
    height: 300px;
  }
}

.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 30px;
  .side-card-wrapper {
    width: 300px;
    margin-left: 20px;
  }
  .side-card {
    width: 300px;
    padding: 20px;
    box-shadow: 2px 2px 5px #ddd;
    background-color: #fefefe;
    border-radius: 4px;
    &.fixed {
      position: fixed;
      top: 30px;
    }
    > ul {
      margin: 0 0 20px 0;
      padding: 0;
      text-align: center;
      li {
        + li {
          margin-left: 10px;
        }
        display: inline-block;
        cursor: pointer;
        border-bottom: 1px solid transparent;
        font-size: 14px;
        color: #555;
        &.active {
          color: #fc6423;
          border-bottom-color: #fc6423;
        }
        &:hover {
          color: #fc6423;
        }
      }
    }
    .about-site {
      display: flex;
      flex-direction: column;
      align-items: center;
      .header-img {
        width: 200px;
        height: 134px;
        background-image: url('/images/site-info.jpg');
        background-size: contain;
        border-radius: 4px;
      }
      nav {
        display: flex;
        > a {
          + a {
            border-left: 1px solid $lightGray;
          }
          display: block;
          width: 60px;
          span {
            display: block;
            text-align: center;
            &:first-child {
              font-weight: bold;
              font-size: 16px;
              color: $lightBlank;
            }
            &:last-child {
              font-size: 14px;
              color: $darkGray;
            }
          }
        }
      }
      .find-me {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        a {
          display: block;
          line-height: 1;
        }
      }
    }
    .toc {
      align-self: flex-start;
    }
  }
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
