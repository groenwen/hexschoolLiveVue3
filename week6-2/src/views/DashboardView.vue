<template>
  <header class="mt-5">
    <h1 class="mb-5">後台</h1>
    <button type="button" class="btn btn-primary" @click="signout()">登出</button>
  </header>
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
      if (token) {
        this.$http.post(url)
          .then(() => {
            // 驗證成功
            alert('登入成功')
          })
          .catch((err) => {
            // 驗證錯誤 回到登入頁面
            alert(err.data.message)
            this.$router.push('/login')
          })
      } else {
        alert('尚未登入')
        this.$router.push('/login')
      }
    },
    // 將 cookie 的 token 到期時間 刪除，表示登出 並回到登入頁面
    signout () {
      document.cookie = 'groenToken=;expires=;'
      alert('已登出')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>
