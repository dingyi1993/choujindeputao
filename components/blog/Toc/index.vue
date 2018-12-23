<template>
  <div id="blog-toc" class="blog-toc">
    <div class="blog-toc-content">
      <toc-item :list="list"></toc-item>
    </div>
  </div>
</template>
<script>
import TocItem from './item'

export default {
  components: { TocItem },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.blog-toc {
  ol {
    margin: 0;
    padding: 0 2px 5px 10px;
    text-align: left;
    list-style: none;
    font-size: 14px;
    > ol {
      padding-left: 0;
    }
    a {
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
      transition-property: all;
      color: $darkGray;
      border-bottom-color: #ccc;
      &:hover {
        color: $black;
        border-bottom-color: $black;
      }
    }
  }
  .nav-item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.8;
  }
  .nav {
    // .nav-child {
    //   display: none;
    // }
    .active {
      > .nav-child {
        display: block;
      }
      > a {
        color: #fc6423;
        border-bottom-color: #fc6423;
      }
    }
    .active-current {
      > .nav-child {
        display: block;
        > .nav-item {
          display: block;
        }
      }
      > a {
        color: #fc6423;
        &:hover {
          color: #fc6423;
        }
      }
    }
  }
}
.toc-anchor {
  display: none;
}
</style>
