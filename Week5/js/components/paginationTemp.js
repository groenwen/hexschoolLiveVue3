export default {
  template: '#paginationTemp',
  props: ['pagination'],
  methods: {
    emitPages(item){
      this.$emit('emit-pages', item)
    }
  }
}