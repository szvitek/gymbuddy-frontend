<template>
  <b-container class="loginContainer">
    <h1>Gym Buddy Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group id="login-group-1" label="Email:" label-for="login-email">
        <b-form-input
          id="login-email"
          v-model="loginModel.email"
          type="email"
          required
          placeholder="Enter your email address"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="login-group-2"
        label="Password:"
        label-for="login-password"
      >
        <b-form-input
          id="login-password"
          v-model="loginModel.password"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Sign In</b-button>
      <b-button v-b-modal.modal-registration variant="secondary">
        Sign Up
      </b-button>
    </b-form>
    <b-img class="mt-3" src="@/assets/images/logo.jpg" />

    <b-modal
      id="modal-registration"
      @ok="onRegister"
      title="Sign Up"
      ok-title="Sign Up"
    >
      <b-form @submit.prevent="onRegister">
        <b-form-group
          id="registration-group-1"
          label="Email:"
          label-for="registration-email"
        >
          <b-form-input
            id="registration-email"
            v-model="registrationModel.email"
            type="email"
            required
            placeholder="Enter your email address"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="registration-group-2"
          label="Password:"
          label-for="input-password1"
        >
          <b-form-input
            id="registration-password1"
            v-model="registrationModel.password1"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="registration-group-3"
          label="Confirm Password:"
          label-for="input-password2"
        >
          <b-form-input
            id="registration-password2"
            v-model="registrationModel.password2"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
        </b-form-group>

        <template v-slot:modal-ok>
          <b-button v-b-modal.modal-registration variant="secondary">
            Sign Up
          </b-button>
        </template>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'loggedOut',
  components: {},
  data() {
    return {
      loginModel: {
        email: '',
        password: ''
      },
      registrationModel: {
        email: '',
        password1: '',
        password2: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    ...mapActions({
      login: 'login'
    }),
    async onLogin() {
      await this.login({ email: 'mail', password: 'pw123' })
      this.$router.push('/home')
    },
    onRegister() {
      // eslint-disable-next-line no-console
      console.log('register clicked')
      this.$router.push('/home')
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

img {
  width: 30%;
  height: 30%;
}

.loginContainer > form {
  width: 100%;
  padding: 2rem;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
