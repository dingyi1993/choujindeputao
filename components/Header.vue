<template>
  <header></header>
</template>
<style lang="scss" scoped>
header {
  height: 650px;
  background-image: url('/images/banner.jpg');
  background-size: cover;
  background-position: center;
  @include mobile {
    height: 200px;
  }
}
</style>
