<template>
  <div v-html="content"></div>
</template>
<script>
import markdownIt from 'markdown-it'
import toc from 'markdown-it-toc-and-anchor'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export default {
  props: {
    source: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      content: '',
    }
  },
  created() {
    const md = markdownIt({
      html: true,
      xhtmlOut: true,
      breaks: true,
      linkify: true,
      typographer: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (__) {}
        }

        return '' // use external default escaping
      }
    })
    md.use(toc, {
      anchorClassName: 'toc-anchor',
      tocCallback: (tocMarkdown, tocArray, tocHtml) => {
        if (tocHtml) {
          // if (this.tocId && document.getElementById(this.tocId)) {
          //   document.getElementById(this.tocId).innerHTML = tocHtml
          // }

          // this.$emit('toc-rendered', tocHtml, tocArray)
          this.$store.commit('updateTocArray', tocArray)
        }
      },
    })
    this.content = md.render(this.source)
  },
}
</script>

