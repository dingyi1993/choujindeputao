<template>
  <section class="container">
    <div class="blog-list">
      <div v-for="item in blogList" :key="item.id">
        <div v-if="item.banner" class="banner" :style="{ backgroundImage: `url(${item.banner})` }"></div>

        <div class="content">
          <h1>
            <nuxt-link
              :to="{ name: item.id === 'magicsearch' ? 'blog-magicsearch' : 'blog-id', params: { id: item.id } }"
              class="button"
            >{{ item.title }}</nuxt-link>
          </h1>
          <sub-line :datetime="item.datetime" :category="item.category" :views="item.views"></sub-line>
          <div class="entry">
            {{ item.excerpt }}
          </div>
          <nuxt-link
            class="read-more buling"
            :to="{ name: item.id === 'magicsearch' ? 'blog-magicsearch' : 'blog-id', params: { id: item.id } }"
          >READ MORE <fa :icon="['fas', 'angle-double-right']" /></nuxt-link>
        </div>
      </div>
    </div>
    <div class="pagination">
      <div class="pagination-inner">
        <nuxt-link
          tag="button"
          :disabled="pagination.page === 1"
          class="prev"
          :to="{ name: pagination.page === 2 ? 'index' : 'page', params: { page: pagination.page === 2 ? undefined : (pagination.page - 1) } }"
        ><fa :icon="['fas', 'angle-double-left']" style="margin-right: 10px;" />上一页</nuxt-link>
        <span>{{ pagination.page }}/{{ pagination.totalPage }}</span>
        <nuxt-link
          tag="button"
          :disabled="pagination.page === pagination.totalPage"
          class="next"
          :to="{ name: 'page', params: { page: pagination.page + 1 } }"
        >下一页<fa :icon="['fas', 'angle-double-right']" style="margin-left: 10px;" /></nuxt-link>
      </div>
    </div>
  </section>
</template>
<script>
import SubLine from '~/components/SubLine'
export default {
  // watchQuery: ['page'],
  components: { SubLine },
  async asyncData({ params, app }) {
    const page = params.page ? Number(params.page) : 1
    const pageSize = 10
    const result = await app.$axios.$get('/api/blog', { params: { page, pageSize } })
    return {
      containerShow: false,
      blogList: result.data.list,
      pagination: {
        pageSize,
        page,
        totalPage: Math.ceil(result.data.count / pageSize)
      },
    }
  },
  // head() {
  //   return {
  //     title: 'About Page'
  //   }
  // },
  methods: {
  },
  mounted() {
  },
  // watch: {
  //   'pagination.page'() {
  //     document.documentElement.scrollTop = document.body.scrollTop = 200
  //     this.$nextTick(() => {
  //       this.calBlogCard()
  //     })
  //   },
  // },
}
</script>

<style lang="scss" scoped>
.blog-list {
  > div {
    + div {
      margin-top: 20px;
      @include mobile {
        margin-top: 12px;
      }
    }
    box-shadow: 2px 2px 5px #ddd;
    transition: all 0.8s cubic-bezier(0.19, 1, 0.5, 1);
    background-color: #fefefe;
    border-radius: 4px;
    @include mobile {
      width: 100%;
    }
    &:hover {
      box-shadow: 0 15px 30px rgba(0,0,0,0.1);
      transform: translateY(-2px);
    }
    .banner {
      height: 300px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      background-size: cover;
      background-position: center;
      @include mobile {
        height: 180px;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px 20px 8px;
      h1 {
        margin: 0;
        font-size: 2rem;
        a {
          display: block;
          // overflow: hidden;
          // white-space: nowrap;
          // text-overflow: ellipsis;
        }
      }
      .entry {
        padding-top: 10px;
        min-height: 60px;
        font-size: 1.3rem;
        color: $darkGray;
      }
      .read-more {
        display: block;
        align-self: flex-end;
        height: 30px;
        line-height: 30px;
        font-size: 1.2rem;
      }
    }
  }
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .pagination-inner {
    display: flex;
    height: 48px;
    line-height: 48px;
    font-size: 1.4rem;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 2px 2px 5px #ddd;
    button {
      width: 90px;
      background-color: transparent;
      &:not([disabled]):hover {
        color: #fff;
        background-color: $blue;
      }
      &[disabled] {
        color: $gray;
        cursor: not-allowed;
      }
      &.prev {
        border-radius: 3px 0 0 3px;
      }
      &.next {
        border-radius: 0 3px 3px 0;
      }
    }
    span {
      display: block;
      color: $gray;
      padding: 0 15px;
    }
  }
}
</style>
