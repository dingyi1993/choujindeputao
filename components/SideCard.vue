<template>
  <div class="side-card-wrapper">
    <div class="side-card-list" :class="{ fixed: false }">
      <card class="side-card side-card-info">
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
              <p>{{ siteInfo.siteName }}</p>
              <nav>
                <nuxt-link :to="{ name: 'archive' }">
                  <span>{{ siteInfo.blogCount }}</span>
                  <span>日志</span>
                </nuxt-link>
                <nuxt-link :to="{ name: 'category' }">
                  <span>{{ siteInfo.categoryCount }}</span>
                  <span>分类</span>
                </nuxt-link>
                <a href="javascript:;">
                  <span>{{ siteInfo.tagCount }}</span>
                  <span>标签</span>
                </a>
              </nav>
              <div class="find-me">
                <a class="github-btn" href="https://github.com/dingyi1993" title="github" target="_blank" style="font-size: 26px;"><fa :icon="['fab', 'github']" /></a>
              </div>
            </div>
            <blog-toc v-else class="toc"></blog-toc>
          </transition>
        </keep-alive>
      </card>
      <card class="side-card side-card-menu" style="padding: 12px 0;">
        <ul>
          <li>
            <nuxt-link :to="{ name: 'message' }"><fa :icon="['far', 'comment-alt']" />留言板</nuxt-link>
            <!-- <div>
              <input v-model="currentMsg" placeholder="说点啥再走呗" type="text" @keypress.enter="handleLeaveMsg" />
              <input v-model="user.nickName" placeholder="昵称" type="text" @keypress.enter="handleLeaveMsg" />
              <input v-model="user.email" placeholder="邮箱" type="text" @keypress.enter="handleLeaveMsg" />
              <ul>
                <li v-for="item in msgList" :key="item">{{ item }}</li>
              </ul>
            </div> -->
          </li>
        </ul>
      </card>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Card from '~/components/Card'
import BlogToc from '~/components/blog/Toc/index'

export default {
  components: { Card, BlogToc },
  data() {
    return {
      currentMsg: '',
      msgList: [],
      user: {
        nickName: '',
        email: '',
        siteUrl: '',
      },
    }
  },
  computed: {
    ...mapGetters(['currentSideCard', 'needFixed']),
    isBlog() {
      return this.$route.name === 'blog-id'
    },
  },
  methods: {
    handleLeaveMsg() {
      if (!this.currentMsg) {
        return
      }
      if (!this.user.nickName || !this.user.email) {
        alert('记得输入昵称和邮箱哦')
        return
      }
      this.msgList.push(this.currentMsg)
      this.currentMsg = ''
    },
  },
}
</script>
<style lang="scss" scoped>
.side-card-wrapper {
  position: sticky;
  top: 20px;
  margin-left: 20px;
  @include mobile {
    display: none;
  }
}
.side-card-list {
  width: 300px;
}
.side-card {
  + .side-card {
    margin-top: 20px;
  }
}
.side-card-info {
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
        color: $orange;
        border-bottom-color: $orange;
      }
      &:hover {
        color: $orange;
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
.side-card-menu {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      > a {
        display: block;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        &:hover {
          background-color: $lightGray;
          color: $lightBlank;
        }
        > * {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
