export default {
  SET_GROUPS(state, groups) {
    state.groups = groups
  },

  SET_EXERCISES(state, { exercises }) {
    state.exercises = exercises
  },
  SET_EXERCISE(state, exercise) {
    state.exercise = exercise
  }
}
