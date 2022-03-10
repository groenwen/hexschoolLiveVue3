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
    <v-loading :active="isLoading" :loader="'dots'"></v-loading>
    <product-modal ref="callModal" :product-item="productItem"></product-modal>
  </div>
</template>

<script>
import pagination from '../components/PaginationTemp.vue'
import productModal from '../components/ProductModal.vue'

export default {
  data () {
    return {
      isLoading: false,
      products: [],
      productItem: {},
      pagination: {}
    }
  },
  components: {
    pagination,
    productModal
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`)
        .then((res) => {
          this.isLoading = false
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
    },
    openModal (item) {
      this.$refs.callModal.innerOpenModal()
      this.productItem = item
    },
    // 加入購物車
    addToCart (productId, qty = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      const data = { product_id: productId, qty }
      this.isLoading = true
      this.$http
        .post(url, { data })
        .then((res) => {
          // this.getCarts()
          // this.$emit('emit-cart')
          alert(res.data.message)
          this.isLoading = false
        }).catch((err) => {
          alert(err.data)
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
