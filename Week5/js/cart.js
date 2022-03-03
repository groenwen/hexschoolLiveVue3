// 產品列出來
// 元件 - 查看 產品 modal 單一產品
// 元件 - 做出分頁 區域註冊
// 加產品到購物車
// 驗證

//Q 加入購物車 與 更新購物車 id 會混亂

//定義表單規則
Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./js/zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const api_url = "https://vue3-course-api.hexschool.io/v2";
const api_path = "groen";

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
      //當前 ID
      
      //所有產品
      products: [],

      //頁面資訊
      pagination: {},

      //單一產品
      productItem: {},

      //購物車列表
      cartsList: [],

      //user
      user: {
        email: '',
        name: '',
        phone: '',
        address: '',
        message: ''
      }
    };
  },
  components: {
    productModal, pagination
  },
  methods: {
    updateProducts(page = 1) {
      let url = `${api_url}/api/${api_path}/products?page=${page}`;
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
    //加入購物車
    addToCart(productId, qty = 1){
      let url = `${api_url}/api/${api_path}/cart`;
      let data = {'product_id': productId, qty }
      axios.post(url, {data}).then((res) => {
        alert(res.data.message);
        this.updateCarts();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    //修改品項數量
    changeQty(cartItemId, qty){
      let url = `${api_url}/api/${api_path}/cart/${cartItemId}`;
      let data = {'product_id': cartItemId, qty }
      axios.put(url, {data}).then((res) => {
        this.updateCarts();
        // alert(res.data.message);
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    //刪除單一品項
    delCartItem(cartItemId){
      let url = `${api_url}/api/${api_path}/cart/${cartItemId}`;
      axios.delete(url).then((res) => {
        alert(res.data.message);
        this.updateCarts();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    //清空購物車
    clearCarts(){
      let url = `${api_url}/api/${api_path}/carts`;
      axios.delete(url).then((res) => {
        alert(res.data.message);
        this.updateCarts();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    //更新購物車
    updateCarts(){
      let url = `${api_url}/api/${api_path}/cart`;
      axios.get(url)
      .then((res) => {
        this.cartsList = res.data.data;
        console.log(res.data.data);
      })
      .catch((err) => {
        alert('updateCart ' + url + err);
      });
    },
    //送出表單
    onSubmit(){

    }
  },
  mounted() {
    this.updateProducts();
    this.updateCarts();
  },
});

//註冊 表單元件
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount("#app");
