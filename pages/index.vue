<template>
  <section class="container">
    <div ref="blogList" class="blog-list">
      <div v-for="item in blogList" :key="item.id" :ref="'blog' + item.id">
        <!-- <h1><nuxt-link :to="{ name: 'about' }" class="button">{{ item.title }}</nuxt-link></h1>
        <p>{{ item.excerpt }}</p>
        <div class="read-more">
          <a href="javascript:;">READ MORE >></a>
        </div> -->
        <div v-if="item.banner" class="banner" :style="{ backgroundImage: `url(${item.banner})` }"></div>

        <div class="content">
          <h1><nuxt-link :to="{ name: 'blog-id', params: { id: item.id } }" class="button">{{ item.title }}</nuxt-link></h1>
          <sub-line :datetime="item.datetime"></sub-line>

          <div class="entry">
            {{ item.excerpt }}
          </div>
          <div class="read-more">
            <nuxt-link :to="{ name: 'blog-id', params: { id: item.id } }">READ MORE <i class="fa fa-angle-double-right"></i></nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <div class="pagination-inner">
        <a v-if="pagination.page === 1" class="prev disabled" href="javascript:;"><i class="fa fa-angle-double-left"></i>上一页</a>
        <nuxt-link v-else class="prev" :to="{ name: 'page', params: { page: pagination.page - 1 } }"><i class="fa fa-angle-double-left"></i>上一页</nuxt-link>

        <span>{{ pagination.page }}/{{ pagination.totalPage }}</span>

        <a v-if="pagination.page === pagination.totalPage" class="next disabled" href="javascript:;">下一页<i class="fa fa-angle-double-right"></i></a>
        <nuxt-link v-else class="next" :to="{ name: 'page', params: { page: pagination.page + 1 } }">下一页<i class="fa fa-angle-double-right"></i></nuxt-link>
      </div>
    </div>
  </section>
</template>
<script>
import SubLine from '~/components/SubLine'
import blogList from './blogList'
export default {
  components: { SubLine },
  async asyncData({ req, params }) {
    const page = params.page ? Number(params.page) : 1
    const pageSize = 7
    const pagination = { pageSize, page, totalPage: Math.ceil(blogList.length / pageSize) }
    return {
      blogList: blogList.slice(pageSize * (page - 1), pageSize * page),
      pagination,
    }
  },
  // head() {
  //   return {
  //     title: 'About Page'
  //   }
  // },
  mounted() {
    var leftHeight = 0,
        rightHeight = 0,
        space = 20,
        ratio = 0.33;
    this.blogList.forEach(item => {
      var dom = this.$refs['blog' + item.id][0],
        selfHeight = dom.offsetHeight;
      if (
        (rightHeight < leftHeight && ((leftHeight - rightHeight) >= (selfHeight * ratio))) ||
        (rightHeight > leftHeight && ((rightHeight - leftHeight) < (selfHeight * ratio)))
      ) {
        dom.style.top = rightHeight + 'px'
        dom.style.right = 0
        // $this.css({
        //   top: rightHeight,
        //   right: 0,
        // });
        rightHeight += selfHeight + space;
      } else {
        dom.style.top = leftHeight + 'px'
        dom.style.left = 0
        // $this.css({
        //   top: leftHeight,
        //   left: 0,
        // });
        leftHeight += selfHeight + space;
      }
    })
    this.$refs.blogList.style.height = Math.max(leftHeight, rightHeight) + 'px'
    // $('#main').removeClass('not-ready').addClass('animate');
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/variables/index.scss';

.container {
  // position: relative;
  // // height: 100%;
  // padding-top: 30px;
}
.blog-list {
  position: relative;
  width: 1000px;
  margin: auto;
  > div {
    position: absolute;
    width: 480px;
    box-shadow: 2px 2px 5px #ddd;
    transition: all 0.8s cubic-bezier(0.19, 1, 0.5, 1);
    background-color: #fefefe;
    border-radius: 4px;
    // margin: 10px;
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
    }
    .content {
      padding: 20px 20px 8px;
      h1 {
        margin: 0;
        font-size: 2rem;
        a {
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .entry {
        padding-top: 10px;
        min-height: 60px;
        font-size: 1.3rem;
        color: $darkGray;
      }
      .read-more {
        height: 30px;
        line-height: 30px;
        text-align: right;
        font-size: 1.2rem;
        a {
          display: inline-block;

          &:hover {
            // @include animation(buling 5s infinite ease-in-out);
          }
        }
      }
    }
  }
}
.pagination {
  margin-top: 30px;
  text-align: center;
  &:hover {
    a {
      opacity: 1;
      &.prev {
        border-color: $gray;
      }
    }
  }
  .pagination-inner {
    display: inline-block;
    margin: 0 auto;
    font-size: 1.4rem;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 2px 2px 5px #ddd;
    a, span {
      display: block;
      float: left;
      line-height: 24px;
      padding: 12px 15px;
    }
    a {
      &:hover {
        color: #fff;
        background-color: $blue;
      }
      &.disabled {
        color: $gray;
        &:hover {
          color: $gray;
          background-color: inherit;
          cursor: not-allowed;
        }
      }
    }
    span {
      color: $gray;
    }
    .prev {
      border-radius: 3px 0 0 3px;
      i {
        margin-right: 10px;
      }
    }
    .next {
      border-radius: 0 3px 3px 0;
      i {
        margin-left: 10px;
      }
    }
  }
}
</style>
