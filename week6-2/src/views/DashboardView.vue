<template>
  <h2>後台頁面</h2>
  <button type="button" class="btn btn-primary" @click="signout()">登出</button>
</template>

<script>
export default {
  methods: {
    checkAdmin () {
      // 取出 token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)groenToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      // 驗證 API
      const url = `${process.env.VUE_APP_API}/api/user/check`

      // 驗證使用者
      this.$http.defaults.headers.common.Authorization = token
      console.log(token)
      if (token) {
        this.$http.post(url)
          .then(() => {
            // 驗證成功
            // 取得產品資料
            // this.updateProducts();
            console.log('登入成功')
          })
          .catch((err) => {
            // 驗證錯誤 回到登入頁面
            alert(err.data.message)
            console.log(err)
            this.$router.push('/login')
          })
      } else {
        alert('尚未登入後台')
        this.$router.push('/login')
      }
    },
    signout () {
      document.cookie = 'groenToken=;expires=;'
      alert('已登出後台')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>
