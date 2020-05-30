<template>
  <div>
    <CategoryForm @submit="onSubmit" @delete="onDelete" :category="category" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CategoryForm from '@/components/categories/CategoryForm'
export default {
  components: { CategoryForm },
  computed: {
    ...mapGetters({
      category: 'categories/category'
    })
  },
  async created() {
    try {
      await this.$store.dispatch(
        'categories/getCategory',
        this.$route.params.id
      )
    } catch (err) {
      this.$notify({ type: 'error', text: err.message })
    }
  },
  methods: {
    async onSubmit(data) {
      try {
        await this.$store.dispatch('categories/update', data)
        this.$notify({ type: 'success', text: 'Category Updated' })
        this.$router.push('/categories')
      } catch (err) {
        this.$notify({ type: 'error', text: err.message })
      }
    },
    async onDelete() {
      try {
        // todo: confirmation modal
        await this.$store.dispatch('categories/delete', this.category._id)
        this.$notify({ type: 'success', text: 'Category Deleted' })
        this.$router.push('/categories')
      } catch (err) {
        this.$notify({ type: 'error', text: err.message })
      }
    }
  }
}
</script>
