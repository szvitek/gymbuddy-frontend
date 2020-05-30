<template>
  <div>
    <category-form @submit="onSubmit" />
  </div>
</template>

<script>
import CategoryForm from '@/components/categories/CategoryForm'
export default {
  components: { CategoryForm },
  methods: {
    onSubmit(data) {
      try {
        this.$store.dispatch('categories/create', data)
        this.$notify({ type: 'success', text: 'Category saved' })
        this.$router.push('/categories')
      } catch (err) {
        this.$notify({ type: 'error', text: err.message })
      }
    }
  }
}
</script>
