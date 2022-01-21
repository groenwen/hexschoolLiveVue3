import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp ({
    data(){
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            api_path:'groen',
            products: [],
            productItem: {},
        }
    },
    methods: {
        //驗證使用者
        checkAdmin(){
            //驗證 API
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then((res) => {
                    //驗證成功
                    //取得 產品資料
                    this.getProducts();
                })
                .catch((err) => {
                    //驗證錯誤 回到登入頁面
                    alert(err.data.message);
                    window.location = 'index.html';
                });
        },
        getProducts(){ 
            //管理控制台- 產品 API
            const url = `${this.apiUrl}/api/${this.api_path}/admin/products`;
            axios.get(url)
                .then((res) => {
                    // 取得所有產品資料 存入 products 
                    this.products = res.data.products;
                })
                .catch((err) => {
                    alert(err.data.message);
            });
        },
        productItem(){

        }
    },
    mounted() {
        //取出 token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)groenToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        
        //驗證使用者
        axios.defaults.headers.common.Authorization = token;
        this.checkAdmin();
    }

}).mount('#app');