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
          label="Name:"
          label-for="registration-name"
        >
          <b-form-input
            id="registration-name"
            v-model="registrationModel.name"
            type="text"
            required
            placeholder="Name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="registration-group-2"
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
          id="registration-group-3"
          label="Password:"
          label-for="registration-password"
        >
          <b-form-input
            id="registration-password"
            v-model="registrationModel.password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="registration-group-4"
          label="Confirm Password:"
          label-for="registration-confirm-password"
        >
          <b-form-input
            id="registration-confirm-password"
            v-model="registrationModel.confirmPassword"
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
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      login: 'user/login',
      register: 'user/register'
    }),
    async onLogin() {
      try {
        await this.login(this.loginModel)
        this.$router.push('/')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('e', err)
        // todo: toast!
      }
    },
    async onRegister() {
      // eslint-disable-next-line no-console
      console.log('register clicked')
      try {
        await this.register(this.registrationModel)
        this.$router.push('/')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        // todo: toast!
        // todo: don't close the modal if err
      }
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
