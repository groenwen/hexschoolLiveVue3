<template>
  <h2>首頁</h2>
</template>

<script>
export default {
  mounted() {
    console.log(this.$http.get);
    console.log(process.env.VUE_APP_API);
  },
};
</script>
