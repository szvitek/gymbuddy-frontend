<template>
  <div>
    <b-form @submit.prevent="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="Name:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="formData.name"
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
          v-model="formData.description"
          placeholder="Exercise description"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Categories:"
        label-for="input-categories"
      >
        <multiselect
          id="input-categories"
          v-model="formData.categories"
          :options="categories"
          :multiple="true"
          label="name"
          track-by="name"
        />
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Muscle Groups:"
        label-for="input-groups"
      >
        <multiselect
          id="input-groups"
          v-model="formData.muscleGroups"
          :options="muscleGroups"
          :multiple="true"
        />
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
/*
- vue-multiselect doesn't work with computed property
- if I set default formData in data() it's not in sync with the actual exercise
- for now I use a watcher, maybe should investigate further and find a better solution
*/
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    muscleGroups: {
      type: Array,
      default: () => []
    },
    exercise: {
      type: Object,
      default: () => ({
        name: '',
        description: '',
        categories: null,
        muscleGroups: null
      })
    }
  },
  data() {
    return {
      isEditMode: !!this.$route.params.id,
      formData: {}
    }
  },
  computed: {
    title() {
      const prefix = this.isEditMode ? 'Update' : 'New'
      return `${prefix} Exercise`
    }
  },
  watch: {
    exercise: {
      immediate: true,
      handler() {
        this.formData = { ...this.exercise }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.formData)
    },
    onReset() {
      this.formData = {
        name: '',
        description: '',
        categories: null,
        muscleGroups: null
      }
    }
  }
}
</script>
