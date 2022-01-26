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
            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            console.log('hello');
            axios.post(api, this.user)
            .then((res) => {
                const { token, expired } = res.data;
                console.log(res, res.data.token);
                //將 token 存入 cookie
                document.cookie = `groenToken=${token};expires=${expired};path=/`;
                // window.location = './';
            })
            .catch((err) => {
                alert(err.data);
                console.log(err);
            });

            
        }
    }
}).mount('#app');