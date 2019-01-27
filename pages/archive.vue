<template>
  <section class="container">
    <card class="archive-card">
      <ul>
        <li v-for="yearList in blogList" :key="yearList.year">
          <p>{{ yearList.year }}</p>
          <ul>
            <li v-for="item in yearList.list" :key="item.id">
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
const getYear = getDateFormat('YYYY')
const getMonthDay = getDateFormat('MM-DD')

export default {
  components: { Card },
  async asyncData({ req, app }) {
    const result = await app.$axios.$get('/api/blog')
    const blogList = []
    result.data.list.forEach(item => {
      const year = getYear(item.datetime)
      if (blogList.length === 0) {
        blogList.push({ year, list: [] })
      } else {
        if (blogList[blogList.length - 1].year !== year) {
          blogList.push({ year, list: [] })
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
      title: '抽筋的葡萄 - 归档'
    }
  },
  filters: {
    getMonthDay,
  },
}
</script>

<style lang="scss" scoped>
.archive-card {
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
