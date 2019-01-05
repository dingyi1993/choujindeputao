<template>
  <div class="sub-line">
    <time :title="datetime | dateFormat"><i class="fa fa-calendar"></i>&nbsp;{{ datetime | dateFormat('YYYY-MM-DD') }}</time>
    <div v-if="category" class="category">
      <a class="js-category-btn" href="/about"><i class="fa fa-folder-o"></i>&nbsp;{{ category.name }}</a>
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
    <div><i class="fa fa-eye"></i>&nbsp;{{ views }}</div>
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
      type: Object,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
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
.sub-line {
  display: flex;
  color: $gray;
  > :not(:first-child) {
    margin-left: 20px;
  }
}
// .category {
//   margin-left: 20px;
// }
</style>
