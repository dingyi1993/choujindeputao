<template>
  <div class="card"><slot></slot></div>
</template>
<script>
export default {
  props: {
  },
  computed: {
  },
}
</script>

<style lang="scss" scoped>
.card {
  padding: 20px;
  box-shadow: 2px 2px 5px #ddd;
  background-color: #fefefe;
  border-radius: 4px;
}
</style>

