<template>
  <section class="container">
    <card class="category-card">
      <h1>分类</h1>
      <ul>
        <li v-for="categoryList in blogList" :key="categoryList.category.id">
          <p>{{ categoryList.category.name }}</p>
          <ul>
            <li v-for="item in categoryList.list" :key="item.id">
              <span>{{ item.datetime | getMonthDay }}</span>
              <nuxt-link
                :to="{ name: item.id === 'magicsearch' ? 'blog-magicsearch' : 'blog-id', params: { id: item.id } }"
                class="button"
              >{{ item.title }}</nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </card>
  </section>
</template>
<script>
import moment from 'moment'
import Card from '~/components/Card'

const getDateFormat = (format = 'YYYY-MM-DD HH:mm:ss') => {
  return (datetime) => moment(datetime).format(format)
}
const getMonthDay = getDateFormat('MM-DD')

export default {
  components: { Card },
  async asyncData({ req, app }) {
    const result = await app.$axios.$get('/api/blog')
    const blogList = []
    result.data.list.forEach(item => {
      if (blogList.length === 0) {
        blogList.push({ category: item.category, list: [] })
      } else {
        if (blogList[blogList.length - 1].category.id !== item.category.id) {
          blogList.push({ category: item.category, list: [] })
        }
      }
      blogList[blogList.length - 1].list.push(item)
    })
    return {
      blogList,
    }
  },
  head() {
    return {
      title: `${this.siteInfo.siteName} - 分类`
    }
  },
  filters: {
    getMonthDay,
  },
}
</script>

<style lang="scss" scoped>
.category-card {
  > ul {
    > li {
      p {
        font-weight: bold;
      }
      > ul {
        li {
          span {
            margin-right: 12px;
            color: $blue;
          }
        }
      }
    }
  }
}
</style>
