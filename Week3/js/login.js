import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({

    data(){
        return {
            user: {
                username: 'yuwen7005@gmail.com',
                password: 'gj94fu4'
            }
        }
    },
    methods:{
        login(){
            const url = `https://vue3-course-api.hexschool.io/v2/admin/signin`;
            axios.post(url, this.user)
            .then((res) => {
                //登入成功
                // 取得 登入資料 並存入 cookie
                const {token, expired } = res.data;
                document.cookie = `groenToken=${token};expires=${new Date(expired)};path=/`;

                // 登入成功 轉至 產品頁面
                window.location = `index.html`;
            })
            .catch((err) => {
                //登入失敗
                //顯示 錯誤訊息
                alert(err.data.message)
            })
        }

    },
    mounted(){

    }
}).mount('#app');