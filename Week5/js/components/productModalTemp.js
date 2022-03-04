export default {
  template: '#productModalTemp',
  props: ['productItem'],
  data(){
    return {
      thisModal: '',
    }
  },
  methods: {
    innerOpenModal(){
      this.thisModal.show();
    },
  },
  mounted(){
    this.thisModal = new bootstrap.Modal(this.$refs.productModal)
  }
}