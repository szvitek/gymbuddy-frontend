<template>
  <div>
    Categories

    <b-btn @click="$router.push('/categories/new')">NEW</b-btn>
    <b-table
      :items="categories"
      striped
      hover
      show-empty
      empty-text="No Categories found"
    ></b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      categories: 'categories/categories'
    })
  },
  async created() {
    try {
      // ...mapActions({}) still doesn't work...
      // await this.getCategories()
      await this.$store.dispatch('categories/getCategories')
    } catch (err) {
      this.$notify({ type: 'error', text: err.message })
    }
  },
  actions: {}
}
</script>
