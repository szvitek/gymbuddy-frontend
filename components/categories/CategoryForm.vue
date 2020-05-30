<template>
  <div class="CategoryForm">
    <b-form @submit.prevent="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="Name:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="formData.name"
          type="text"
          required
          placeholder="Category name"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success">Save</b-button>
      <b-button v-if="isEditMode" @click="$emit('delete')" variant="danger">
        Delete
      </b-button>
      <b-button v-else type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => ({ name: '' })
    }
  },
  data() {
    return {
      isEditMode: !!this.$route.params.id
    }
  },
  computed: {
    title() {
      const prefix = this.isEditMode ? 'Update' : 'New'
      return `${prefix} Category`
    },
    formData() {
      return { ...this.category }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.formData)
    },
    onReset() {
      this.formData.name = ''
    }
  }
}
</script>
