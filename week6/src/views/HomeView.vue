<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(this.$http.get);
    console.log(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`);
  },
};
</script>
