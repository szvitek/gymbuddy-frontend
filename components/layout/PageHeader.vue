<template>
  <div class="Header">
    <h1>{{ title }}</h1>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  }
}
</script>

<style scoped>
.Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  border-bottom: 2px dashed gray;
}
</style>
