<template>
  <div id="container" class="container" v-html="htmlStr">
  </div>
</template>
<script>
// import Vue from 'vue'
// import VueMarkdown from 'vue-markdown'
// import $ from 'jquery'
// import htmlStr from './qwe.json'

// import hljs from 'highlight.js/lib/highlight'
// import javascript from 'highlight.js/lib/languages/javascript'
// import 'highlight.js/styles/github.css'

// import blogList from '../blogList'

// hljs.registerLanguage('javascript', javascript)

export default {
  components: {
    // VueMarkdown,
  },
  layout: 'project',
  async asyncData({ req, app, params }) {
    let mdResult = await app.$axios.$get(`${process.env.NODE_ENV === 'production' ? 'https://www.dingyi1993.com' : 'http://127.0.0.1:3000'}/blogs/magicsearch.html`)
    mdResult = mdResult.replace(/{% highlight html %}([^☯]+?){% endhighlight %}/g, (match, $1, $2) => {
      return `<pre>${$1.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`
    }).replace(/{% highlight javascript %}([^☯]+?){% endhighlight %}/g, (match, $1, $2) => {
      return `<pre>${$1.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`
    })
    return {
      // blog: blogList.find(item => item.id === params.id),
      htmlStr: mdResult,
    //   content,
    }
  },
  head() {
    return {
      title: 'MagicSearch - 抽筋的葡萄',
    }
  },
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
}
</script>
<style lang="scss">
body {
  line-height: 1.8;
}

a {
  color: #4ae;
  cursor: pointer;
  &:hover, &:active, &.active {
      color: #4ae;
      text-decoration: underline;
  }
}

h1, h2, h3, h4, h5, h6 {
    color: #222;
    font-weight: normal;
}

h1 {
    font-size: 8rem;
    margin: 0;

    // @include mobile {
    //     font-size: 4.6rem;
    // }
}

h2 {
    color: #FF5722;
    margin-top: 0;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 34px;

    // @include pc {
    text-align: left;
    // }
}

section {
    border-top: 2px solid whitesmoke;
    padding: 20px 0;
    background-color: white;

    // @include pc {
    padding: 40px 0;
    // }
}

hr {
    border: 0;
    border-top: 2px solid whitesmoke;
}

figure.highlight {
    overflow: auto;
    margin: 10px 0;
}

button {
    background-color: #4ae;
    color: $white;
    border: none;
    outline: none;
    border-radius: 5px;
    height: 34px;
    cursor: pointer;
    padding: 0 10px;

    &:hover {
        background-color: #2e8ece;
    }

    &:active {
        box-shadow: 10px 10px 15px #296d9a inset;
    }
}

::-moz-selection {
  background: #4ae;
}
::selection {
  background: #4ae;
}

.container1 {
  margin: 0 auto;
  max-width: 1000px;
  padding: 0 8px;

  // @include pc {
  padding: 0 32px;
  // }
}

.magicsearch {
  height: 34px;
  padding: 8px 12px;
  border: 2px solid #ccc;
  border-radius: 6px;
  outline: none;
  width: 230px;
  margin-bottom: 10px;

  &:focus {
    border-color: #0097cf;
  }
}

.bg-info {
  background-color: #e3f2fd;
  padding: 15px;
  border: 2px solid #0262C2;
  border-radius: 4px;
  color: #253238;
}
.bg-warning {
  background-color: #fff8e1;
  padding: 15px;
  border: 2px solid #ff8f00;
  border-radius: 4px;
  color: #253238;
}
.bg-error {
  background-color: #ffebee;
  padding: 15px;
  border: 2px solid #e23237;
  border-radius: 4px;
  color: #253238;
}

.magicsearch-wrapper.blue-text .magicsearch-box li.enabled {
  color: blue;
}

.magicsearch-wrapper.yellow-bg .magicsearch-box {
  background-color: yellow;
}

#container {
  width: 100%;
  height: 100%;
  background-color: #fefefe;

  .demo {
      margin: 20px 0;
  }
}

.nav {
  display: none;
  position: fixed;
  width: 120px;
  height: 100%;
  padding-top: 70px;
  text-align: right;
  background: white;
  border-right: 2px solid whitesmoke;

  // @include pc {
  display: block;
  width: 20%;
  }

  .nav-item {
    display: block;
    padding: 2px 32px 2px 0;
  // }
}

#main {
  margin-left: 0;

  // @include pc {
  margin-left: 20%;
  // }
}

.button {
  display: block;
  padding: 5px 20px;
  margin-bottom: 8px;
  border: 2px solid #4ae;
  color: #4ae;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 4px;
  white-space: nowrap;

  // @include pc {
  display: inline-block;
  margin-right: 8px;
  // }

  &:hover {
    color: white;
    background-color: #4ae;
    text-decoration: none;
  }
}

header {
  background-color: white;
  padding-top: 50px;
  text-align: center;
  color: #444;

  // @include pc {
  padding-top: 65px;
  text-align: left;
  // }

  .logo-credit {
    display: block;
    margin-bottom: 15px;
    color: #444;

    // @include pc {
    position: relative;
    top: -3px;
    padding-left: 57px;
    // }
  }

  .lead {
    margin-bottom: 11px;
    font-size: 1.7rem;
    color: #5e5e5e;
  }

  .primary-actions {
    padding-bottom: 50px;
  }
}

.options-section {
  th {
    text-align: left;
  }
  th, td {
    padding: 8px 16px 8px 1px;
    border-bottom: 1px solid whitesmoke;
  }
  .default-row {
    min-width: 130px;
  }

  // .options-table {
  //     @include mobile {
  //         display: none;
  //     }
  // }

  .option-type {
    color: $gray;
  }
}

footer {
  padding: 2rem 0;
  border-top: 2px solid whitesmoke;
  background-color: white;
  text-align: center;

  // @include pc {
  text-align: left;
  // }

  .button {
    margin-top: 0.5rem;
  }
}
</style>
