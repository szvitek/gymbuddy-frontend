<template>
  <div>
    <ul>
      <li v-for="(exercises, group) in filteredExercises">
        {{ group }}
        <ul>
          <li v-for="ex in exercises">
            <span
              @click.prevent="
                $store.dispatch('exercises/fetchExercise', ex._id)
              "
            >
              {{ ex.name }}
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      groups: 'exercises/groups',
      exercises: 'exercises/exercises'
    }),
    filteredExercises() {
      return this.exercises.reduce((acc, ex) => {
        if (!acc[ex.group]) acc[ex.group] = []
        acc[ex.group].push(ex)
        return acc
      }, {})
    }
  },
  actions: {
    ...mapActions({
      fetchExercises: 'exercises/fetchExercises'
    })
  },
  async created() {
    // await this.fetchExercises()
    // looks like for some reason mapActions not really working with nuxt, but this syntax does:
    await this.$store.dispatch('exercises/fetchExercises')
  }
}
</script>
