<template>
  <div id="blog-toc" class="blog-toc">
    <div class="blog-toc-content">
      <toc-item v-if="tocTree" :list="tocTree"></toc-item>
      <div v-else class="blog-toc-skeleton">
        <div style="width: 150px;"></div>
        <div style="margin-left: 20px; width: 150px;"></div>
        <div style="margin-left: 20px; width: 150px;"></div>
        <div style="width: 150px;"></div>
        <div style="margin-left: 20px; width: 150px;"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TocItem from './item'

export default {
  components: { TocItem },
  data() {
    return {
      tocTree: null,
    }
  },
  computed: {
    ...mapGetters(['tocArray']),
  },
  methods: {
    calTocTree(tocArray) {
      const newTocArray = []
      const rootNodeStack = []
      tocArray.forEach(item => {
        if (item.level === 2) { // 定义根节点
          const newItem = Object.assign({ isRoot: true }, item)
          newTocArray.push(newItem)
          if (rootNodeStack.length) {
            rootNodeStack.pop()
          }
          rootNodeStack.push(newItem)
        } else {
          let tmpRootItem = rootNodeStack[rootNodeStack.length - 1]
          if (item.level === tmpRootItem.level + 1) {
            if (!tmpRootItem.children) {
              tmpRootItem.children = []
            }
            tmpRootItem.children.push(Object.assign({}, item))
          } else if (item.level > tmpRootItem.level + 1) {
            const newItem = Object.assign({}, item)
            tmpRootItem = tmpRootItem.children[tmpRootItem.children.length - 1]
            if (!tmpRootItem.children) {
              tmpRootItem.children = []
            }
            tmpRootItem.children.push(newItem)
            rootNodeStack.push(tmpRootItem)
          } else {
            const newItem = Object.assign({}, item)
            rootNodeStack.pop()
            rootNodeStack[rootNodeStack.length - 1].children.push(newItem)
            rootNodeStack.push(newItem)
          }
        }
      })
      return newTocArray
    },
  },
  mounted() {
    this.tocTree = this.calTocTree(this.tocArray)
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
        color: $orange;
        border-bottom-color: $orange;
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
        color: $orange;
        &:hover {
          color: $orange;
        }
      }
    }
  }
}
.blog-toc-skeleton {
  > div {
    height: 20px;
    background-color: $lightGray;
    + div {
      margin-top: 8px;
    }
  }
}

.toc-anchor {
  display: none;
}
</style>
