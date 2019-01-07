<template>
  <div id="magicsearch-container" class="container" v-html="htmlStr">
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

// hljs.registerLanguage('javascript', javascript)

export default {
  components: {
    // VueMarkdown,
  },
  layout: 'project',
  async asyncData({ req, app, params }) {
    const result = await app.$axios.$get('/api/blog/magicsearch')
    const mdResult = result.data.md.replace(/{% highlight html %}([^☯]+?){% endhighlight %}/g, (match, $1, $2) => {
      return `<pre>${$1.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`
    }).replace(/{% highlight javascript %}([^☯]+?){% endhighlight %}/g, (match, $1, $2) => {
      return `<pre>${$1.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`
    })
    return {
      htmlStr: mdResult,
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
  methods: {
    bindMagicsearchEvents() {
      const dataSource = [
        {id: 1, firstName: 'Tim', lastName: 'Cook'},
        {id: 2, firstName: 'Eric', lastName: 'Baker'},
        {id: 3, firstName: 'Victor', lastName: 'Brown'},
        {id: 4, firstName: 'Lisa', lastName: 'White'},
        {id: 5, firstName: 'Oliver', lastName: 'Bull'},
        {id: 6, firstName: 'Zade', lastName: 'Stock'},
        {id: 7, firstName: 'David', lastName: 'Reed'},
        {id: 8, firstName: 'George', lastName: 'Hand'},
        {id: 9, firstName: 'Tony', lastName: 'Well'},
        {id: 10, firstName: 'Bruce', lastName: 'Wayne'},
      ]
      const options = {
        dataSource: dataSource,
        id: 'id',
        format: '%firstName% · %lastName%',
        fields: ['firstName', 'lastName'],
      }
      //example
      $('#example1').magicsearch($.extend({}, options, {focusShow: true}))
      $('#example2').magicsearch($.extend({}, options, {multiple: true, multiField: 'firstName'}))

      //feature
      $('#feature2').magicsearch(options)
      $('#feature3').magicsearch($.extend({}, options, {multiple: true, multiField: 'firstName', dropdownBtn: true}))
      $('#feature4').magicsearch($.extend({}, options, {multiple: true, multiField: 'firstName', focusShow: true}))
      $('#feature5').magicsearch($.extend({}, options, {multiple: true, multiField: 'firstName', focusShow: true}))
      $('#feature6').magicsearch($.extend({}, options, {multiple: true, multiField: 'firstName', focusShow: true}))
      $('#feature7').magicsearch(options)
      $('#feature8').magicsearch($.extend({}, options, {multiple: true, multiField: 'firstName'}))

      //dataSource
      $('.function').magicsearch($.extend({}, options, {
        dataSource: function($input) {
          const type = $input.attr('data-type')
          if (type == 1) {
            return [
              {id: 1, firstName: 'Tim', lastName: 'Cook'},
              {id: 2, firstName: 'Eric', lastName: 'Baker'},
              {id: 3, firstName: 'Victor', lastName: 'Brown'},
            ]
          } else if (type == 2) {
            return '[{"id": 4, "firstName": "Lisa", "lastName": "White"},{"id": 5, "firstName": "Oliver", "lastName": "Bull"},{"id": 6, "firstName": "Zade", "lastName": "Stock"}]'
          }
        },
        dropdownBtn: true
      }))

      //type
      $('#ajax-btn').click(function() {
        $('#type1').magicsearch($.extend({}, options, {
          dataSource: '/data/magicsearch.json',
          type: 'ajax',
          dropdownBtn: true,
        }))
      })

      //ajaxOptions
      $('#ajaxOptions-btn').click(function() {
        $('#ajaxOptions1').magicsearch($.extend({}, options, {
          dataSource: '/data/magicsearch.json',
          type: 'ajax',
          ajaxOptions: {
            success: function(data) {
              alert('回调成功，啦啦啦~')
            }
          },
          dropdownBtn: true,
        }))
      })

      //id
      $('#id1').magicsearch($.extend({}, options, {
        dropdownBtn: true,
        success: function($input, data) {
          $('#id1-span').text($input.attr('data-id'))
        },
        afterDelete: function($input, data) {
          $('#id1-span').text($input.attr('data-id'))
        }
      }))
      $('#id2').magicsearch($.extend({}, options, {
        dropdownBtn: true,
        multiple: true,
        multiField: 'firstName',
        success: function($input, data) {
          $('#id2-span').text($input.attr('data-id'))
        },
        afterDelete: function($input, data) {
          $('#id2-span').text($input.attr('data-id'))
        }
      }))

      //fields
      $('#fields1').magicsearch($.extend({}, options, {
        fields: 'firstName',
        focusShow: true
      }))
      $('#fields2').magicsearch($.extend({}, options, {
        focusShow: true
      }))

      //format
      $('#format1').magicsearch($.extend({}, options, {
        fields: 'firstName',
        format: '%firstName%',
        focusShow: true
      }))
      $('#format2').magicsearch($.extend({}, options, {
        focusShow: true
      }))

      //inputFormat
      $('#inputFormat1').magicsearch($.extend({}, options, {
        inputFormat: '%firstName%',
        focusShow: true
      }))

      //maxShow
      const maxShowDataSource = [
        {id: 1, name: 'f'},
        {id: 2, name: 'fo'},
        {id: 3, name: 'for'},
        {id: 4, name: 'forr'},
        {id: 5, name: 'forre'},
        {id: 6, name: 'forrep'},
        {id: 7, name: 'forrepe'},
        {id: 8, name: 'forrepea'},
        {id: 9, name: 'forrepeat'},
        {id: 10, name: 'forrepeatt'},
      ]
      $('#maxShow1').magicsearch($.extend({}, options, {
        dataSource: maxShowDataSource,
        fields: 'name',
        format: '%name%',
        maxShow: 3,
        focusShow: true
      }))
      $('#maxShow2').magicsearch($.extend({}, options, {
        dataSource: maxShowDataSource,
        fields: 'name',
        format: '%name%',
        maxShow: 6,
        focusShow: true
      }))

      $('#isClear1').magicsearch($.extend({}, options, {
        isClear: false
      }))

      //showSelected
      $('#showSelected1').magicsearch($.extend({}, options, {
        focusShow: true
      }))
      $('#showSelected2').magicsearch($.extend({}, options, {
        showSelected: false,
        focusShow: true
      }))
      $('#showSelected3').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'firstName',
        showSelected: false,
        focusShow: true
      }))

      //dropdownBtn
      $('#dropdownBtn1').magicsearch($.extend({}, options, {
        dropdownBtn: true
      }))

      //multiple
      $('#multiple1').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'firstName'
      }))

      //maxItem
      $('#maxItem1').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'firstName',
        maxItem: true,
        focusShow: true
      }))
      $('#maxItem2').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'firstName',
        maxItem: 3,
        focusShow: true
      }))

      //showMultiSkin
      $('#showMultiSkin1').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'firstName',
        showMultiSkin: false,
        focusShow: true,
        success: function($input, data) {
          $('#showMultiSkin1-span').text($input.attr('data-id'))
          $('#showMultiSkin1-code').text(JSON.stringify(data))
        },
        afterDelete: function($input, data) {
          $('#showMultiSkin1-span').text($input.attr('data-id'))
          $('#showMultiSkin1-code').text(JSON.stringify(data))
        }
      }))

      //multiStyle
      $('#multiStyle1').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'firstName',
        multiStyle: {
          space: 5,
        },
        focusShow: true
      }))
      $('#multiStyle2').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'firstName',
        multiStyle: {
          width: 80,
        },
        focusShow: true
      }))

      //multiField
      $('#multiField1').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'firstName',
        focusShow: true
      }))
      $('#multiField2').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'lastName',
        focusShow: true,
      }))

      //focusShow
      $('#focusShow1').magicsearch(options)
      $('#focusShow2').magicsearch($.extend({}, options, {
        focusShow: true,
        hidden: true
      }))

      //noResult
      $('#noResult1').magicsearch($.extend({}, options, {
        dataSource: [],
        noResult: '啥都没有，啦啦啦~~~'
      }))

      //skin
      $('#skin1').magicsearch($.extend({}, options, {
        focusShow: true,
        skin: 'blue-text yellow-bg'
      }))

      //disableRule
      $('#disableRule1').magicsearch($.extend({}, options, {
        disableRule: function(data) {
          return data.firstName.toLowerCase().indexOf('o') > -1
        },
      }))

      //success
      $('#success1').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'lastName',
        focusShow: true,
        success: function($input, data) {
          alert('你刚选择的数据为：' + JSON.stringify(data) + '，当前data-id值为：' + $input.attr('data-id'))
        },
      }))

      //afterDelete
      $('#afterDelete1').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'lastName',
        afterDelete: function($input, data) {
          alert('你刚删除的数据为：' + JSON.stringify(data) + '，当前data-id值为：' + $input.attr('data-id'))
        },
      }))

      //clear
      $('#clear1').magicsearch(options)
      $('#clear1-btn').click(function() {
        $('#clear1').trigger('clear')
      })
      $('#clear2').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'lastName',
      }))
      $('#clear2-btn').click(function() {
        $('#clear2').trigger('clear')
      })

      //destroy
      $('#destroy1').magicsearch(options)
      $('#destroy1-btn').click(function() {
        $('#destroy1').trigger('destroy')
      })
      $('#destroy2').magicsearch($.extend({}, options, {
        multiple: true,
        multiField: 'lastName',
      }))
      $('#destroy2-btn').click(function() {
        $('#destroy2').trigger('destroy')
      })

      //destroy
      $('#update1').magicsearch($.extend({}, options, {
        focusShow: true,
      }))
      $('#update1-btn').click(function() {
        const newDataSource = [
          {id: 'abc', firstName: '这是', lastName: '更换'},
          {id: 'def', firstName: '后的', lastName: '数据源'},
        ]
        $('#update1').trigger('update', {dataSource: newDataSource})
      })
      $('#update1-restore-btn').click(function() {
        $('#update1').trigger('update', {dataSource: dataSource})
      })
    },
  },
  mounted() {
    if (window._hasLoadScript) {
      this.bindMagicsearchEvents()
    } else {
      const jQueryScript = document.createElement('script')
      jQueryScript.src = '/js/jquery-2.2.3.min.js'
      document.body.appendChild(jQueryScript)
      jQueryScript.onload = () => {
        const magicsearchScript = document.createElement('script')
        magicsearchScript.src = '/js/magicsearch/jquery.magicsearch.min.js'
        document.body.appendChild(magicsearchScript)
        magicsearchScript.onload = () => {
          window._hasLoadScript = true
          this.bindMagicsearchEvents()
        }
      }
    }
  },
}
</script>
<style lang="scss">
#magicsearch-container {
  width: 100%;
  height: 100%;
  background-color: #fefefe;
  line-height: 1.8;

  .demo {
    margin: 20px 0;
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
}
</style>
