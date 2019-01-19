<template>
  <div v-html="content"></div>
</template>
<script>
import markdownIt from 'markdown-it'
import toc from 'markdown-it-toc-and-anchor'
import taskLists from 'markdown-it-task-lists'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('javascript', javascript)

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
            return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`
          } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
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
    md.use(taskLists, { enabled: true })

    const originalHeadingOpen = md.renderer.rules.heading_open

    md.renderer.rules.heading_open = (...args) => {
      const [ tokens, idx, options, , self ] = args
      if (originalHeadingOpen) {
        originalHeadingOpen.apply(self, args)
      }
      const aIndex = tokens[idx].attrIndex('id')
      tokens[idx].attrs[aIndex][1] = encodeURIComponent(tokens[idx].attrs[aIndex][1])
      return self.renderToken(tokens, idx, options)
    }

    this.content = md.render(this.source)
  },
}
</script>

