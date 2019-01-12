<template>
  <div class="card" :style="cardStyle"><slot></slot></div>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  computed: {
    cardStyle() {
      const styleObj = {}
      if (this.width) {
        styleObj.width = `${width}px`
      }
      if (this.height) {
        styleObj.height = `${height}px`
      }
      return styleObj
    },
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

