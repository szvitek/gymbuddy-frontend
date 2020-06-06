<template>
  <div class="Exercises">
    <page-header title="Exercises">
      <b-btn @click="$router.push('/exercises/new')" variant="primary">
        NEW
      </b-btn>
    </page-header>

    <div v-b-toggle.collapse-1 class="Filter" variant="primary">
      <span class="when-open">
        <b-icon-chevron-double-up />
        Close Filters
        <b-icon-chevron-double-up />
      </span>
      <span class="when-closed">
        <b-icon-chevron-double-down />
        Muscle Group:
        <b-badge variant="info">{{ filters.group.name }} </b-badge>, Category:
        <b-badge variant="warning">{{ filters.category.name }}</b-badge>
        <b-icon-chevron-double-down />
      </span>
    </div>
    <b-collapse id="collapse-1" ref="filterCollapse" class="mt-2">
      <b-list-group horizontal class="mb-2">
        <b-list-group-item
          v-for="group in groups"
          :key="group._id"
          :active="isFilterActive(group, 'group')"
          @click="filters.group = group"
          >{{ group.name }}</b-list-group-item
        >
      </b-list-group>
      <b-list-group horizontal>
        <b-list-group-item
          v-for="category in categories"
          :key="category._id"
          :active="isFilterActive(category, 'category')"
          @click="filters.category = category"
          >{{ category.name }}</b-list-group-item
        >
      </b-list-group>
    </b-collapse>

    <div
      v-if="filteredExercises && filteredExercises.length"
      class="ExercisesContainer mt-3"
    >
      <b-card
        v-for="exercise in filteredExercises"
        :key="exercise._id"
        :title="exercise.name"
        @click="onCardClick(exercise._id)"
        img-src="@/assets/images/default-category.png"
        tag="article"
        style="max-width: 20rem;"
        class="ExercisesCard mb-2"
      >
        <b-card-text>
          <span v-if="exercise.description">{{ exercise.description }}</span>
          <span v-else>No description</span>
          <div>
            <b-badge
              v-for="mg in exercise.muscleGroups"
              :key="mg"
              class="mr-1"
              variant="info"
            >
              {{ mg }}
            </b-badge>
          </div>
          <div>
            <b-badge
              v-for="cat in exercise.categories"
              :key="cat._id"
              class="mr-1"
              variant="warning"
            >
              {{ cat.name }}
            </b-badge>
          </div>
        </b-card-text>
      </b-card>
    </div>
    <div v-else>
      No exercises found 😢
    </div>
  </div>
</template>

<script>
/*
todo: extract `filter` and `exercise cards` into their own components
todo: once filter and pagination will be ready on api side update filter logic and add pagination
*/
import { mapGetters } from 'vuex'
import { BIconChevronDoubleDown, BIconChevronDoubleUp } from 'bootstrap-vue'
import PageHeader from '@/components/layout/PageHeader'

export default {
  name: 'ExerciseList',
  components: {
    BIconChevronDoubleDown,
    BIconChevronDoubleUp,
    PageHeader
  },
  data() {
    return {
      filters: {
        group: { _id: 0, name: 'All' },
        category: { _id: 0, name: 'All' }
      }
    }
  },
  computed: {
    ...mapGetters({
      _groups: 'exercises/groups',
      _categories: 'categories/categories',
      exercises: 'exercises/exercises'
    }),
    groups() {
      return [
        { _id: 0, name: 'All' },
        ...this._groups.map((g, i) => ({ _id: i + 1, name: g }))
      ]
    },
    categories() {
      return [{ _id: 0, name: 'All' }, ...this._categories]
    },
    filteredExercises() {
      let exercises = [...this.exercises]
      if (this.filters.group._id !== 0) {
        exercises = exercises.filter(e => {
          return e.muscleGroups.includes(this.filters.group.name)
        })
      }
      if (this.filters.category._id !== 0) {
        exercises = exercises.filter(e => {
          return e.categories.some(c => {
            return c._id === this.filters.category._id
          })
        })
      }

      return exercises
    }
  },
  async created() {
    try {
      // await this.getExercises()
      await this.$store.dispatch('categories/getCategories')
      await this.$store.dispatch('exercises/getExercises')
    } catch (err) {
      this.$notify({ type: 'error', text: err.message })
    }
  },
  methods: {
    isFilterActive(value, type) {
      return value._id === this.filters[type]._id
    },
    onCardClick(id) {
      this.$router.push(`/exercises/${id}`)
    }
  }
}
</script>

<style>
.ExercisesContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ExercisesContainer .ExercisesCard:hover {
  background-color: azure;
  cursor: pointer;
  color: cornflowerblue;
}

.list-group-item {
  cursor: pointer;
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
