<template>
  <!-- 
  display muscle group and categories cards at the top
  display exercises in a table 
-->
  <div>
    <page-header title="Exercises">
      <b-btn @click="$router.push('/exercises/new')" variant="primary">
        NEW
      </b-btn>
    </page-header>
    <b-list-group horizontal>
      <b-list-group-item active>All</b-list-group-item>
      <b-list-group-item v-for="group in groups" :key="group">{{
        group
      }}</b-list-group-item>
    </b-list-group>

    <b-table :items="exercises" @row-clicked="onRowClick" striped hover />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from '@/components/layout/PageHeader'

export default {
  name: 'ExerciseList',
  components: { PageHeader },
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
  async created() {
    try {
      // await this.getExercises()
      await this.$store.dispatch('exercises/getExercises')
    } catch (err) {
      this.$notify({ type: 'error', text: err.message })
    }
  },
  methods: {
    onRowClick(ex) {
      this.$router.push(`/exercises/${ex._id}`)
    }
  }
}
</script>
