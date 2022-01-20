//載入 Vue
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp ({
    data(){
        return {
            user: {
                username: 'yuwen7005@gmail.com',
                password: '',
            }
        }
    },
    methods: {
        login() {
            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            
            axios.post(api, this.user)
            .then((res) => {
                //登入成功
                
                // 取得 登入資料 並存入 cookie
                console.log(res.data);
                const {expired, token} = res.data;
                //path 指定哪些路徑可以存取 cookie
                document.cookie=`groenToken=${token};expires=${new Date(expired)};path=/`;
                //轉至 產品頁面
                window.location = 'products.html';
            }).catch((err) => {
                //登入失敗 跳出錯誤訊息
                alert(err.data.message);
            });
        },
    },
}).mount('#app');