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
        //確認使用者
        checkAdmin(){
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then((res) => {
                    this.getProducts();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getProducts(){ 
            console.log('hello')
            const url = `${this.apiUrl}/api/${this.api_path}/admin/products`;
            axios.get(url)
                .then((res) => {
                    this.products = res.data.products;
                    console.log(res.data.products);
                })
                .catch((data) => {

            });
        },
        productItem(){
            
        }
    },
    mounted() {
        //取出 token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)groenToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        console.log(document.cookie);

        this.checkAdmin()
    }

}).mount('#app');