<template>
  <div class="subline">
    <time :title="datetime | dateFormat"><i class="fa fa-calendar"></i>&nbsp;{{ datetime | dateFormat('YYYY-MM-DD') }}</time>
    <div v-if="category" class="category">
      <a class="js-category-btn" href="/about"><i class="fa fa-folder-o"></i>&nbsp;{{ category }}</a>
      <!-- {% if site.categories.size > 1 %}
      <div class="options">
        <ul>
          {% for category in site.categories %}
          <li><a{% if category.first == page.category %} class="active"{% endif %} href="{{ site.baseurl }}/category/#{{ category.first }}">{{ category.first }}</a></li>
          {% endfor %}
        </ul>
      </div>
      {% endif %} -->
    </div>
    <span v-if="false"><i class="fa fa-eye"></i>&nbsp;<span data-hk-page>0</span></span>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  props: {
    datetime: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: '',
    },
  },
  filters: {
    dateFormat(datetime, format = 'YYYY-MM-DD HH:mm:ss') {
      return moment(datetime).format(format)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/variables/index.scss';

.subline {
  color: $gray;
}
</style>
