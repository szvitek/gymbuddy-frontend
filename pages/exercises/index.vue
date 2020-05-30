<template>
  <!-- 
  display muscle group and categories cards at the top
  display exercises in a table 
-->
  <div>
    <b-list-group horizontal>
      <b-list-group-item active>All</b-list-group-item>
      <b-list-group-item v-for="group in groups" :key="group">{{
        group
      }}</b-list-group-item>
    </b-list-group>

    <b-btn @click="$router.push('/exercises/new')">NEW</b-btn>
    <b-table :items="exercises" striped hover></b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      selectedGroup: 'All'
    }
  },
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
  actions: {},
  async created() {
    try {
      // await this.getExercises()
      await this.$store.dispatch('exercises/getExercises')
    } catch (err) {
      this.$notify({ type: 'error', text: err.message })
    }
  }
}
</script>
