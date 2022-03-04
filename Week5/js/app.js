import productModal from './components/productModalTemp.js';
import pagination from './components/paginationTemp.js';

const api_url = "https://vue3-course-api.hexschool.io/v2";
const api_path = "groen";

// 驗證
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

const app = Vue.createApp({
  data() {
    return {
      isLoading: false,
      //所有產品
      products: [],
      //頁面資訊
      pagination: {},
      //單一產品
      productItem: {},
      //購物車列表
      cartsList: [],
      //表單資料
      dataForm: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: ''
      }
    };
  },
  components: {
    productModal, 
    pagination
  },
  methods: {
    //取得所有產品
    getProducts(page = 1) {
      let url = `${api_url}/api/${api_path}/products?page=${page}`;
      axios.get(url).then((res) => {
        this.products = res.data.products;
        this.pagination = res.data.pagination;
      }).catch((err) => {
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
      let data = {'product_id': productId, qty };
      this.isLoading = true;
      axios.post(url, {data}).then((res) => {
        this.getCarts();
        alert(res.data.message);
      }).catch((err) => {
        alert(err.data.message);
        this.isLoading = false;
      });
    },
    //購物車-修改品項數量
    changeQty(cartItem, product_id, qty){
      let url = `${api_url}/api/${api_path}/cart/${cartItem}`;
      let data = {product_id, qty };
      this.isLoading = true;
      axios.put(url, {data}).then((res) => {
        this.getCarts();
        // alert(res.data.message);
      }).catch((err) => {
        alert(err.data.message);
        this.isLoading = false;
      });
    },
    //購物車-刪除單一品項
    delCartItem(cartItemId){
      let url = `${api_url}/api/${api_path}/cart/${cartItemId}`;
      this.isLoading = true;
      axios.delete(url).then((res) => {
        this.getCarts();
        alert(res.data.message);
      }).catch((err) => {
        alert(err.data.message);
        this.isLoading = false;
      });
    },
    //清空購物車
    clearCarts(){
      let url = `${api_url}/api/${api_path}/carts`;
      this.isLoading = true;
      axios.delete(url).then((res) => {
        this.getCarts();
        alert(res.data.message);
      }).catch((err) => {
        alert(err.data.message);
        this.isLoading = false;
      });
    },
    //更新購物車
    getCarts(){
      let url = `${api_url}/api/${api_path}/cart`;
      this.isLoading = true;
      axios.get(url).then((res) => {
        this.cartsList = res.data.data;
        this.isLoading = false;
        console.log(this.cartsList)
        //購物車沒有產品時 或數量為 0 時 disabled
        if (this.cartsList.carts.length <= 0 || this.cartsList.final_total == 0){
          this.$refs.submitBtn.disabled = true;
        } else {
          this.$refs.submitBtn.disabled = false;
        }
      }).catch((err) => {
        this.isLoading = false;
        alert('updateCart ' + url + err);
      });
    },
    //送出表單
    createOrder(){
      let url = `${api_url}/api/${api_path}/order`;
      axios.post(url, {data: this.dataForm}).then((res) => {
        alert(res.data.message);
        this.getCarts();
        //送出後重設表單
        this.$refs.form.resetForm();
      }).catch((err) => {
        alert(err.data.message);
      });
    }
  },
  mounted() {
    this.getProducts();
    this.getCarts();
  },
});

//loading 元件
app.component('loading', VueLoading.Component);

//註冊 表單元件
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount("#app");
