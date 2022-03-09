<template>
  <h2>產品列表</h2>
  <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">圖片</th>
              <th scope="col">商品名稱</th>
              <th scope="col">價格</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id" :class="{ 'd-none' : !item.is_enabled}">
              <th scope="row"><img :src="item.imageUrl" alt="" width="50" class="img-fluid"></th>
              <td>{{ item.title }}</td>
              <td>${{ item.price }}</td>
              <td class="text-end">
                <button type="button" class="btn btn-outline-secondary btn-sm"
                  @click="openModal(item)">查看更多</button>&nbsp;
                <button type="button" class="btn btn-primary btn-sm"
                @click="addToCart(item.id, 1)" :class="{ disabled : isLoading}">
                  加入購物車
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination :pages="pagination" @emit-pages="getProducts"></pagination>
      </div>
</template>

<script>
import pagination from '../components/PaginationTemp.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
  components: {
    pagination,
  },
  methods: {
    getProducts(page = 1) {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
