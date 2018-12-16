<template>
  <section class="container">
    <article class="post">
      <h1>{{ blog.title }}</h1>

      <div id="toc"></div>
      <sub-line :datetime="blog.datetime"></sub-line>

      <div class="entry">
        <vue-markdown v-highlight @rendered="handleMdRendered">{{ content }}</vue-markdown>
        <!-- <async-example></async-example> -->
      </div>

      <!-- {% if page.tags.size > 0 %}
      <div class="tags">
        <i class="fa fa-tags" title="标签"></i>
        {% for tag in page.tags %}
        <a class="color{{ forloop.index | plus:4 | modulo:7 }}" href="{{ site.baseurl }}/tag/#{{ tag }}">{{ tag }}</a>
        {% endfor %}
      </div>
      {% endif %} -->

      <div class="licence">
        版权声明：自由转载-非商用-非衍生-保持署名（<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" target="_blank">创意共享3.0许可证</a>）
      </div>
    </article>
  </section>
</template>
<script>
import Vue from 'vue'
import VueMarkdown from 'vue-markdown'

import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'

import SubLine from '~/components/SubLine'

import blogList from '../blogList'

hljs.registerLanguage('javascript', javascript)

export default {
  components: {
    VueMarkdown,
    SubLine,
  },
  layout({ params }) {
    return params.id === 'magicsearch' ? 'blog' : 'default'
  },
  async asyncData({ req, app, params }) {
    const result = await app.$axios.$get(`/api/blog/${params.id}`)
    const mdResult = await app.$axios.$get(`${process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:3000'}/blogs/${params.id}.md`)
    // Vue.component('async-example', function (resolve, reject) {
    //   resolve({
    //     template: `<div>${res}</div>`
    //   })
    // })
    const content = mdResult.replace(/{{ page.id }}/g, '/'+ params.id).replace(/\[(.+?)\]\((.+?)\){:target="_blank"}/g, (match, $1, $2) => {
      return `<a href="${$2}" target="_blank">${$1}</a>` // TODO 通用
    })
    return {
      blog: result.data,
      content,
    }
  },
  // head() {
  //   return {
  //     title: '666',
  //   }
  // },
  directives: {
    highlight: {
      inserted: (el) => {
        let blocks = el.querySelectorAll('pre code')
        blocks.forEach((block) => {
          hljs.highlightBlock(block)
        })
      }
    }
  },
  mounted() {
  },
  methods: {
    handleMdRendered(outHtml) {
      // console.log(outHtml)
      // Vue.component('async-example', function (resolve, reject) {
      //   resolve({
      //     template: `<div>${outHtml}</div>`
      //   })
      // })
    },
  },
}
</script>
<style lang="scss">
@import '~assets/style/variables/index.scss';

article.post {
  position: relative;
  width: 1000px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fefefe;
  border-radius: 5px;

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
