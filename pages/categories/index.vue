<template>
  <div class="Categories">
    <page-header title="Categories">
      <b-btn @click="$router.push('/categories/new')" variant="primary">
        NEW
      </b-btn>
    </page-header>

    <div>
      <div v-if="categories && categories.length" class="CategoriesContainer">
        <!-- todo: sometimes cards (images specially) look funky, fix it later -->
        <b-card
          v-for="category in categories"
          :key="category._id"
          :title="category.name"
          @click="onCardClick(category._id)"
          img-src="@/assets/images/default-category.png"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="CategoriesCard mb-2"
        />
      </div>
      <div v-else>
        No categories found 😢
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from '@/components/layout/PageHeader'
export default {
  name: 'CategoriesList',
  components: { PageHeader },
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
  methods: {
    onCardClick(id) {
      this.$router.push(`categories/${id}`)
    }
  }
}
</script>

<style>
.CategoriesContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.CategoriesContainer .CategoriesCard:hover {
  background-color: azure;
  cursor: pointer;
  color: cornflowerblue;
}
</style>
