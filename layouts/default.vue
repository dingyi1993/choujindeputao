<template>
  <div>
    <header></header>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '../components/Footer.vue'
import 'isomorphic-fetch'

export default {
  components: {
    MyFooter
  }
}
</script>

<style lang="less" scoped>
header {
  height: 650px;
  background-image: url('/img/banner.jpg');
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 800px) {
    height: 300px;
  }
}
.container
{
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

.button, .button:visited
{
  display: inline-block;
  color: #3B8070;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #3B8070;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #3B8070;
}

.title
{
  color: #505153;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
