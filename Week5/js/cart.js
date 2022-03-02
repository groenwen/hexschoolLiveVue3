// 產品列出來
// 元件 - 查看 產品 modal 單一產品
// 元件 - 做出分頁 區域註冊
// 加產品到購物車
// 驗證


//先建元件
//資料橋梁嫁接
const pagination = {
  data(){
    return {

    }
  },
  props: ['pagination'],
  template: '#paginationTemp',
  methods: {
    emitPages(item){
      this.$emit('emit-pages', item)
    }
  }


}
const productModal = {
  data(){
    return {
      thisModal: '',
    }
  },
  props: ['productItem'],
  template: '#productModalTemp',
  methods: {
    innerOpenModal(){
      this.thisModal.show();
    },
    
  },
  mounted(){
    this.thisModal = new bootstrap.Modal(this.$refs.productModal, {
      keybord: false
    })
  }
}



const app = Vue.createApp({
  data() {
    return {
      api_url: "https://vue3-course-api.hexschool.io/v2",
      api_path: "groen",
      //所有產品
      products: [],

      //頁面資訊
      pagination: {},

      //單一產品
      productItem: {},

      //購物車列表
      carts: []
    };
  },
  components: {
    productModal, pagination
  },
  methods: {
    updateProducts(page = 1) {
      let url = `${this.api_url}/api/${this.api_path}/products?page=${page}`;
      axios.get(url)
      .then((res) => {
        this.products = res.data.products;
        this.pagination = res.data.pagination;
      })
      .catch((err) => {
        alert(err.data.message);
      });
    },
    openModal(item){
      this.$refs.callModal.innerOpenModal();
      this.productItem = item;
    },
    addToCart(id){
      let url = `${this.api_url}/api/${this.api_path}/cart`;

      axios.post(url, {data:{'product_id': id, 'qty': 1 }})
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.data.message);
      });
      
    },
    updateCart(){
      let url = `${this.api_url}/api/${this.api_path}/cart`;

      axios.get(url)
      .then((res) => {
        this.carts = res.data.carts;
        console.log(this.carts, hello);
      })
      .catch((err) => {
        alert(err.data);
      });
    }

  },
  mounted() {
    this.updateProducts();
    this.updateCart();
  },
});

app.mount("#app");
