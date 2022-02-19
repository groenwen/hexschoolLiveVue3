export default {
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
                this.$emit('update');
            })
            .catch((err) => {
                alert(err.data.message)
            });
        },
    },
    mounted(){
    }
}