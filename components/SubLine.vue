<template>
  <div class="sub-line">
    <time :title="datetime | dateFormat"><fa :icon="['far', 'calendar-alt']" />&nbsp;{{ datetime | dateFormat('YYYY-MM-DD') }}</time>
    <div v-if="category" class="category">
      <a class="js-category-btn" href="javascript:;"><fa :icon="['far', 'folder']" />&nbsp;{{ category.name }}</a>
    </div>
    <div><fa :icon="['far', 'eye']" />&nbsp;{{ views }}</div>
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
