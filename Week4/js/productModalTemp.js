export default {
    data(){
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            api_path: 'groen'
        }
    },
    template: '#productModalTemp',
    props: ['isNew', 'productItem'],
    methods: {
        emitUpdateProduct(){
            this.$emit('emit-update-product');
        },
        getProduct() {
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
                this.$emit('update');
            })
            .catch((err) => {
                alert(err.data.message);
            })
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
    }
}