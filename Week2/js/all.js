//載入 Vue
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp ({
    data(){
        return {
            user: {
                username: 'example@test.com',
                password: 'example',
            }
        }
    },
    methods: {
        login() {
            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            axios.post(api, this.user).then((response) => {
                console.log(response.data);
                // window.location = 'products.html';
            }).catch((err) => {
                console.log(err.data.message);
            });
        },
    },
}).mount('#app');