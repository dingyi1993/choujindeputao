<template>
  <section class="container">
    <article class="blog">
      <h1>{{ blog.title }}</h1>

      <sub-line :datetime="blog.datetime" :category="blog.category" :views="blog.views"></sub-line>

      <div class="entry">
        <!-- <markdown v-highlight toc @rendered="handleMdRendered" @toc-rendered="handleMdTocRendered">{{ content }}</markdown> -->
        <markdown :source="content"></markdown>
        <!-- <async-example></async-example> -->
      </div>

      <div v-if="blog.tags.length" class="tags">
        <i class="fa fa-tags" title="标签"></i>
        <a v-for="(item, index) in blog.tags" :key="item.id" :class="'color' + (index + 5) % 7" href="javascript:;">{{ item.name }}</a>
      </div>

      <div class="licence">
        版权声明：自由转载-非商用-非衍生-保持署名（<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" target="_blank">创意共享3.0许可证</a>）
      </div>
    </article>
  </section>
</template>
<script>
import Vue from 'vue'
// import VueMarkdown from 'vue-markdown'

// import hljs from 'highlight.js/lib/highlight'
// import javascript from 'highlight.js/lib/languages/javascript'
// import 'highlight.js/styles/github.css'

import SubLine from '~/components/SubLine'
import Markdown from '~/components/Markdown.vue'

// hljs.registerLanguage('javascript', javascript)

export default {
  components: { Markdown, SubLine },
  async asyncData({ req, app, params }) {
    const result = await app.$axios.$get(`/api/blog/${params.id}`)
    // Vue.component('async-example', function (resolve, reject) {
    //   resolve({
    //     template: `<div>${res}</div>`
    //   })
    // })
    const content = result.data.md.replace(/{{ page.id }}/g, '/'+ params.id).replace(/\[(.+?)\]\((.+?)\){:target="_blank"}/g, (match, $1, $2) => {
      return `<a href="${$2}" target="_blank">${$1}</a>` // TODO 通用
    })
    return {
      blog: result.data,
      content,
    }
  },
  head() {
    return {
      title: '抽筋的葡萄 - ' + this.blog.title,
    }
  },
  // directives: {
  //   highlight: {
  //     inserted: (el) => {
  //       let blocks = el.querySelectorAll('pre code')
  //       blocks.forEach((block) => {
  //         hljs.highlightBlock(block)
  //       })
  //     }
  //   }
  // },
  methods: {
    handleMdRendered(outHtml) {
      // console.log(outHtml)
      // Vue.component('async-example', function (resolve, reject) {
        //   resolve({
          //     template: `<div>${outHtml}</div>`
      //   })
      // })
    },
    handleMdTocRendered(tocHtml, tocArray) {
      this.$store.commit('updateTocArray', tocArray)
    },
  },
  beforeDestroy() {
    this.$store.commit('updateCurrentSideCard', 'toc')
    // this.$store.commit('updateTocHtml', '')
  },
}
</script>
<style lang="scss">
article.blog {
  position: relative;
  width: 700px;
  // margin: 0 auto;
  padding: 20px 30px;
  background-color: #fefefe;
  border-radius: 4px;
  box-shadow: 2px 2px 5px #ddd;

  // @include middle-screen1 {
  //     width: $mainMiddleWidth;
  // }
  // @include middle-screen2 {
  //     width: 95%;
  // }
  h1 {
      margin: 0;
  }
  h2 {
      border-left: 5px solid $blue;
      padding-left: 15px;
  }
  p code {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
  }
  .entry {
    hr {
      border: 0;
      border-bottom: 1px solid $lightGray;
    }
    img {
      display: block;
      max-height: 500px;
      cursor: zoom-in;
    }
    a {
      color: $blue;
      &:hover {
          text-decoration: underline;
      }
    }
    p {
      font-size: 1.5rem;
      word-break: break-all;
    }
    table {
      width: 100%;
      border-spacing: 0;
      border-collapse: collapse;
      tbody > tr:nth-of-type(odd) {
        background-color: #f9f9f9;
      }
      th {
        padding: 8px;
        border-bottom: 2px solid #ccc;
        font-size: 1.6rem;
      }
      td {
        padding: 8px;
        border-top: 1px solid #ccc;
      }
    }
  }
  .tags {
    margin: 15px 0;
    i {
      vertical-align: middle;
    }
    a {
      display: inline-block;
      font-size: 10px;
      color: $white;
      height: 20px;
      line-height: 20px;
      position: relative;
      border-radius: 0 5px 5px 0;
      margin: 0 5px 5px 10px;
      padding: 0 8px 0 10px;
      &:before {
        content: " ";
        position: absolute;
        width: 0;
        height: 0;
        top: 0;
        left: -20px;
        border: 10px solid transparent;
        border-right-color: #cfb7c4;
      }
      &:after {
        content: " ";
        position: absolute;
        width: 4px;
        height: 4px;
        background-color: #fff;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,.3);
        box-shadow: 0 0 0 1px rgba(0,0,0,.3);
        top: 8px;
        left: 0;
      }
      &:hover {
        opacity: .7;
      }
    }
    .color0 { background-color: $rainbowColor0;&:before { border-right-color: $rainbowColor0;} }
    .color1 { background-color: $rainbowColor1;&:before { border-right-color: $rainbowColor1;} }
    .color2 { background-color: $rainbowColor2;&:before { border-right-color: $rainbowColor2;} }
    .color3 { background-color: $rainbowColor3;&:before { border-right-color: $rainbowColor3;} }
    .color4 { background-color: $rainbowColor4;&:before { border-right-color: $rainbowColor4;} }
    .color5 { background-color: $rainbowColor5;&:before { border-right-color: $rainbowColor5;} }
    .color6 { background-color: $rainbowColor6;&:before { border-right-color: $rainbowColor6;} }
  }
  .licence {
    text-align: right;
    color: $gray;
    margin: 15px 0;
    a {
      color: $darkGray;
    }
  }
}
</style>
