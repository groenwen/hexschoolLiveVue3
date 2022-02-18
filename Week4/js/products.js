import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
// 登入 - (API) 進入產品頁面 (/v2/admin/signin)
// 產品頁面 - 驗證 (/v2/api/user/check)
// 產品頁面 - 取得產品資料 顯示於頁面 (/v2/api/groen/admin/products/all)
// 產品頁面 - bootstrap modal 開啟
// 產品頁面 - 新增產品 (post /v2/api/groen/admin/product/{id})
// 產品頁面 - 編輯產品 (put /v2/api/groen/admin/product/{id})
// 產品頁面 - 刪除產品  (delete /v2/api/groen/admin/product/{id})

// 建立 元件 使用區域註冊


let productModal = null;
let delProductModal = null;


const pagination = {
    template: '#pagination',
    props: ['pages'],
    methods:{
        emitPages(item){
            this.$emit('emit-pages', item)
        }
    }
}
const productModalTemp = {
    template: '#productModalTemp',
    props: ['isNew', 'productItem'],
    methods: {
        emitUpdateProduct(){
            this.$emit('emit-update-product');
        },
        // 多圖-新增圖片
        createImages() {
            this.productItem.imagesUrl = [];
            this.productItem.imagesUrl.push('');
        },
        //多圖-刪除 單一圖片
        delImage(key) {
            this.productItem.imagesUrl.splice(key, 1);
        },
    },
    mounted(){
        // bootstrap modal 建立
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            backdrop: 'static',
            keyboard: false,
            
        });
    }
}

const delProductModalTemp = {
    data(){
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            api_path: 'groen'
        }
    },
    template: '#delProductModalTemp',
    props: ['isNew', 'productItem'],
    methods: {
        // 刪除產品
        delProduct(){
            const url = `${this.apiUrl}/api/${this.api_path}/admin/product/${this.productItem.id}`;

            axios.delete(url, this.productItem.id)
            .then((res) => {
                alert(res.data.message);
                //關閉 modal
                delProductModal.hide();
                //更新 產品列表
                this.$emit('emit-del');
            })
            .catch((err) => {
                alert(err.data.message)
            });
        },
    },
    mounted(){
        // bootstrap modal 建立
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            backdrop: 'static',
            keyboard: false,

        });
        
    }
}

const app = createApp({

    data(){
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            api_path: 'groen',

            //所有產品資訊
            products: [],

            // 頁面資訊
            pagination: {},

            // 共用 modal 判斷點擊 新增/編輯
            isNew: false,

            //儲存 單一產品資訊
            productItem: {
                imagesUrl: [],
            }
        }
    },
    components: {
        pagination,
        productModalTemp,
        delProductModalTemp
        
    },
    methods:{
        checkAdmin(){
            // 取出 token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)groenToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            //驗證 API
            const url = `${this.apiUrl}/api/user/check`;

            // 驗證使用者
            axios.defaults.headers.common.Authorization = token;

            axios.post(url)
                .then((res) => {
                    //驗證成功
                    //取得產品資料
                    this.getProducts();
                    
                })
                .catch((err) => {
                    //驗證錯誤 回到登入頁面
                    alert(err.data.message);
                    window.location = 'login.html';
                });
        },
        getProducts(page = 1){
            //取得所有產品
            const url = `${this.apiUrl}/api/${this.api_path}/admin/products?page=${page}`;
            axios.get(url)
                .then((res) => {
                    // 取得所有產品資料 存入 products
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                })
                .catch((err) => {
                    alert(err.data.message);
                });
        },
        updateProduct() {
            //新增產品 api 資訊
            let url = `${this.apiUrl}/api/${this.api_path}/admin/product`;
            let http = 'post';

            // isNew = false 代表為點擊 編輯產品
            if (!this.isNew){
                url = `${this.apiUrl}/api/${this.api_path}/admin/product/${this.productItem.id}`;
                http = 'put'
            }

            axios[http](url, {data: this.productItem})
            .then((res) => {
                alert(res.data.message);
                //關閉 modal
                productModal.hide();
                //更新 產品列表
                this.getProducts();
            })
            .catch((err) => {
                alert(err.data.message);
            })
        },
        
        
        // modal 控制
        openModal(isNew, item){
            // 新增產品
            if (isNew === 'new'){
                // 建立產品
                this.productItem = {
                    imagesUrl: [],
                };
                
                this.isNew = true;
                productModal.show();
            // 編輯產品
            } else if (isNew === 'edit'){
                // 帶入產品資訊
                this.productItem = {...item};

                this.isNew = false;
                productModal.show();
            // 刪除產品
            } else if ( isNew === 'delete'){
                this.productItem = {...item};
                delProductModal.show();
            }
        },
        
    },
    mounted(){
       
        this.checkAdmin();
    }
});

app.mount('#app');