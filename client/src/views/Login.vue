

<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
      <div class="text-header">
        Login
      </div>
      <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="login(valid, user)"
  >
    <v-text-field
      v-model="user.email"
      :counter="10"
      :rules="emailRules"
      label="Email"
    ></v-text-field>

    <v-text-field
      v-model="user.password"
      :rules="passwordRules"
      label="Password"
    ></v-text-field>


<v-btn class="mr-4" type="submit" >Login</v-btn>


  </v-form>
  <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          indeterminate
          color="primary">
        </v-progress-circular>
    </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex';
export default {
name: 'login',
  data: () => ({
    user: {
      email: '',
      password: ''
    },
    valid: false,
    emailRules: [
      value => !!value || 'Email is required',
      value => /.+@.+\..+/.test(value) || 'Email must be valid'
    ],
    passwordRules: [
      value => (value && value.length < 20 && value.length > 9) || 'Password must have a length of greater than 12 and less than 20'
    ],
  }),
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' } ),
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    login(valid, user){
      const { email, password } = user
      this.authenticate({ strategy: 'local', email, password })
        .then(user => {
          console.log('authenticated user=', user)
          this.$router.push('/boards')
        })
        .catch(err => {
          // Convert the error to a plain object and add a message.
          let type = err.className
          err = Object.assign({}, err)
          err.message =
            type === 'not-authenticated'
              ? 'Incorrect email or password.'
              : 'An error prevented login.'
          this.error = err
          console.log(this.error)
        })
    }
  }
  
}
</script>
