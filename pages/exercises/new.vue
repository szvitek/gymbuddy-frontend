<template>
  <div>
    <b-form @submit.prevent="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="Name:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="form.name"
          type="text"
          required
          placeholder="Exercise Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Description:"
        label-for="input-description"
      >
        <b-form-input
          id="input-description"
          v-model="form.description"
          placeholder="Exercise description"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Categories"
        label-for="input-categories"
      >
        <b-form-select
          id="input-categories"
          v-model="form.categories"
          :options="categoryOptions"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Muscle Groups"
        label-for="input-groups"
      >
        <b-form-select
          id="input-gropus"
          v-model="form.muscleGroups"
          :options="groupOptions"
          required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="success">Save</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {}
    }
  },
  computed: {
    ...mapGetters({
      groups: 'exercises/groups',
      categories: 'categories/categories',
      user: 'user/user'
    }),
    groupOptions() {
      return this.groups.map(g => ({ value: g, text: g }))
    },
    categoryOptions() {
      return this.categories.map(c => ({ value: c._id, text: c.name }))
    }
  },
  async created() {
    try {
      await this.$store.dispatch('categories/getCategories')
    } catch (err) {
      this.$notify({ type: 'error', text: err.message })
    }
  },
  methods: {
    async onSubmit() {
      try {
        const data = {
          name: this.form.name,
          categories: [this.form.categories],
          muscleGroups: [this.form.muscleGroups],
          userId: this.user._id
        }
        await this.$store.dispatch('exercises/create', data)
        this.$notify({ type: 'success', text: 'Exercise saved' })
        this.$router.push('/exercises')
      } catch (err) {
        this.$notify({ type: 'error', text: err.message })
      }
    },
    onReset() {
      this.form = {}
    }
  }
}
</script>
