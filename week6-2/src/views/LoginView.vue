<template>
  <div class="container mt-5">
      <div class="row justify-content-center">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="col-6">
          <form id="form" class="form-signin">
            <div class="form-floating mb-3">
              <input
                v-model="user.username"
                type="email"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                required
                autofocus
              />
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
              />
              <label for="password">Password</label>
            </div>
            <button
              class="btn btn-lg btn-primary w-100 mt-3"
              type="submit"
              @click.prevent="login"
            >
              登入
            </button>
          </form>
        </div>
      </div>
      <a href="./" class="mt-5 d-inline-block">回首頁</a>
      <p class="mt-5 mb-3 text-muted">&copy; 2022~∞ - Groen</p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const url = `${process.env.VUE_APP_API}/admin/signin`
      this.$http.post(url, this.user)
        .then((res) => {
          // 登入成功
          // 取得 登入資料 並存入 cookie
          const { token, expired } = res.data
          document.cookie = `groenToken=${token};expires=${new Date(expired)};path=/`
          // 登入成功 轉至 產品頁面
          this.$router.push('/admin')
        })
        .catch((err) => {
          // 登入失敗
          // 顯示 錯誤訊息
          alert(err.data.message)
        })
    }
  }
}
</script>
