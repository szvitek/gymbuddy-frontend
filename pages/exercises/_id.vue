<template>
  <div>
    <exercise-form
      :exercise="exercise"
      :muscleGroups="groups"
      :categories="categories"
      @submit="onSubmit"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ExerciseForm from '@/components/exercises/ExerciseForm'

export default {
  name: 'ExerciseEdit',
  components: { ExerciseForm },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      groups: 'exercises/groups',
      categories: 'categories/categories',
      user: 'user/user',
      exercise: 'exercises/exercise'
    })
  },
  async created() {
    try {
      await this.$store.dispatch('exercises/getExercise', this.$route.params.id)
      await this.$store.dispatch('categories/getCategories')
    } catch (err) {
      this.$notify({ type: 'error', text: err.message })
    }
  },
  methods: {
    async onSubmit(ex) {
      try {
        const data = {
          _id: ex._id,
          name: ex.name,
          description: ex.description,
          categories: ex.categories.map(c => c._id),
          muscleGroups: ex.muscleGroups,
          userId: this.user._id
        }
        await this.$store.dispatch('exercises/update', data)
        this.$notify({ type: 'success', text: 'Exercise saved' })
        this.$router.push('/exercises')
      } catch (err) {
        this.$notify({ type: 'error', text: err.message })
      }
    },
    async onDelete() {
      try {
        // todo: confirmation modal
        await this.$store.dispatch('exercises/delete', this.exercise._id)
        this.$notify({ type: 'success', text: 'Exercise Deleted' })
        this.$router.push('/exercises')
      } catch (err) {
        this.$notify({ type: 'error', text: err.message })
      }
    }
  }
}
</script>
