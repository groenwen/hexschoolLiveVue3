<template>
  <div class="container">
    <div class="row flex-column align-items-center">
      <div class="col-8">
        <h2 class="py-5 text-center fw-bold">Cart</h2>
        <table class="table">
          <thead>
            <tr>
              <td colspan="2"></td>
              <td colspan="4" class="text-end">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="clearCarts"
                  :class="{ disabled: isLoading }"
                >
                  清除購物車
                </button>
              </td>
            </tr>
            <tr>
              <th scope="col">刪除</th>
              <th scope="col">商品圖</th>
              <th scope="col">品名</th>
              <th scope="col">數量/單位</th>
              <th scope="col">單價</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartsList.carts" :key="item">
              <th scope="row">
                <a href="#" aria-label="delete" class="btn btn-sm btn-outline-secondary"
                  @click.prevent="delCartItem(item.id)"
                  :class="{ disabled: isLoading }">
                  <i class="bi bi-x-lg" style="line-height: 100%"></i>
                </a>
              </th>
              <td><img :src="item.product.imageUrl" width="50" alt="" srcset="" /></td>
              <td>{{ item.product.title }}</td>
              <td width="28%">
                <div class="d-flex align-items-center">
                  <div class="input-group input-group-sm" style="width: auto; margin-right: 0.5rem">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="changeQty(item.id, item.product_id, item.qty - 1)">
                      <i class="bi bi-dash"></i>
                    </button>
                    <input type="text" class="form-control flex-grow-0 text-center"
                      placeholder="test" :value="item.qty" style="width: 40px"
                      aria-labelledby="bty">
                    <button class="btn btn-outline-secondary" type="button"
                      @click="changeQty(item.id, item.product_id, item.qty + 1)">
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                  {{ item.product.unit }}
                </div>
              </td>
              <td>$ {{ item.product.price }}</td>
              <td>$ {{ item.total }}</td>
            </tr>
            <tr>
              <td colspan="6" class="text-end">總計 $ {{ cartsList.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <loading :active="isLoading" :loader="'dots'"></loading>
  <product-modal ref="callModal" :product-item="productItem"></product-modal>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      // 購物車列表
      cartsList: [],
      // 表單資料
      dataForm: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    // 更新購物車
    getCarts() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.cartsList = res.data.data;
        this.isLoading = false;
        console.log(this.cartsList);
        // 購物車沒有產品時 或數量為 0 時disabled
        // if (this.cartsList.carts.length <= 0 || this.cartsList.final_total === 0) {
        //   this.$refs.submitBtn.disabled = true;
        // } else {
        //   this.$refs.submitBtn.disabled = false;
        // }
      }).catch((err) => {
        this.isLoading = false;
        alert(`updateCart ${url} ${err}`);
      });
    },
    // 購物車-修改品項數量
    changeQty(cartItemId, productId, qty) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${cartItemId}`;
      const data = { product_id: productId, qty };
      this.isLoading = true;
      console.log(cartItemId, data);
      this.$http.put(url, { data }).then((res) => {
        this.getCarts();
        alert(res.data.message);
      }).catch((err) => {
        // alert(err.data);
        console.log(err);
        this.isLoading = false;
      });
    },
    // 購物車-刪除單一品項
    delCartItem(cartItemId) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${cartItemId}`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        this.getCarts();
        alert(res.data.message);
      }).catch((err) => {
        alert(err.data.message);
        this.isLoading = false;
      });
    },
    // 清空購物車
    clearCarts() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        this.getCarts();
        alert(res.data.message);
      }).catch((err) => {
        alert(err.data.message);
        this.isLoading = false;
      });
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>
