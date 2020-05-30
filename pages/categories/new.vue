<template>
  <div>
    <h1>{{ title }} category</h1>

    <b-form @submit.prevent="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="Name:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="form.name"
          type="text"
          required
          placeholder="Category name"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success">Save</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  computed: {
    isEdit() {
      return this.$route.params.id
    },
    title() {
      return this.isEdit ? 'Edit' : 'New'
    }
  },
  methods: {
    onSubmit() {
      try {
        this.$store.dispatch('categories/create', this.form)
        this.$notify({ type: 'success', text: 'Category saved' })
        this.$router.push('/categories')
      } catch (err) {
        this.$notify({ type: 'error', text: err.message })
      }
    },
    onReset() {
      this.form.name = ''
    }
  }
}
</script>
