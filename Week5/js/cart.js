// 產品列出來
// 元件 - 查看 產品 modal
// 元件 - 做出分頁 區域註冊
// 加產品到購物車
// 驗證



const app = Vue.createApp({
  data() {
    return {
      api_url: "https://vue3-course-api.hexschool.io/v2",
      api_path: "groen",
      products: []
    };
  },
  methods: {
    getProducts() {
      let url = `${this.api_url}/api/${this.api_path}/products`;
      axios.get(url)
      .then((res) => {
        this.products = res.data.products;
      })
      .catch((err) => {
        alert(err.data.message);
      });
    },
  },
  mounted() {
    this.getProducts();
  },
});

app.mount("#app");
