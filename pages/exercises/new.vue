<template>
  <div>
    <exercise-form
      :muscleGroups="groups"
      :categories="categories"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ExerciseForm from '@/components/exercises/ExerciseForm'

export default {
  name: 'ExerciseNew',
  components: { ExerciseForm },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      groups: 'exercises/groups',
      categories: 'categories/categories',
      user: 'user/user'
    })
  },
  async created() {
    try {
      await this.$store.dispatch('categories/getCategories')
    } catch (err) {
      this.$notify({ type: 'error', text: err.message })
    }
  },
  methods: {
    async onSubmit(ex) {
      try {
        const data = {
          name: ex.name,
          description: ex.description,
          categories: ex.categories.map(c => c._id),
          muscleGroups: ex.muscleGroups,
          userId: this.user._id
        }
        await this.$store.dispatch('exercises/create', data)
        this.$notify({ type: 'success', text: 'Exercise saved' })
        this.$router.push('/exercises')
      } catch (err) {
        this.$notify({ type: 'error', text: err.message })
      }
    }
  }
}
</script>
