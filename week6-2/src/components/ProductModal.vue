<template>
  <div class="modal fade" ref="productModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="staticBackdropLabel">{{ productItem.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <img :src="productItem.imageUrl" class="img-fluid" alt="">
            </div>
            <div class="col-6">
              <span class="badge rounded-pill bg-dark">{{ productItem.category }}</span>
              <h3 class="fw-bold mt-2">{{ productItem.title }}</h3>
              <p>{{ productItem.content }}<br> <span class="text-secondary">{{ productItem.description }}</span></p>
              <p>
                <span class="fw-bold fs-5">$</span>&nbsp;
                <span class="fw-bold fs-3">{{ productItem.price }}</span>&nbsp;&nbsp;
                <span class="text-decoration-line-through fs-6">${{ productItem.origin_price }}</span>&nbsp;&nbsp;
                <span class="fs-6">∕ {{ productItem.unit }}</span>
              </p>
              <button type="button" class="btn btn-primary btn-sm"
              @click="modalAddToCart(productItem.id, 1)">
                加入購物車
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['productItem'],
  data () {
    return {
      thisModal: ''
    }
  },
  methods: {
    innerOpenModal () {
      this.thisModal.show()
    },
    innerhideModal () {
      this.thisModal.hide()
    },
    modalAddToCart (id, qty) {
      this.$emit('modal-addtocart', id, qty)
    }
  },
  mounted () {
    this.thisModal = new Modal(this.$refs.productModal)
  }
}
</script>
