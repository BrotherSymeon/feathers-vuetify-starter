

<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
      <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="register"
    v-if="!loading"
  >
    <v-text-field
      v-model="user.email"
      :rules="emailRules"
      label="Email"
    ></v-text-field>

    <v-text-field
      v-model="user.password"
      :rules="passwordRules"
      label="Password"
    ></v-text-field>
    <v-text-field
      v-model="user.confirmPassword"
      :rules="confirmPasswordRules"
      label="Confirm Password"
    ></v-text-field>
    <v-text-field
      v-model="user.displayName"
      :rules="displayNameRules"
      label="Display Name"
    ></v-text-field>
    <v-text-field
      v-model="user.imageUrl"
      :rules="imageUrlRules"
      label="Avatar"
    ></v-text-field>


<v-btn :disabled="!valid" class="mr-4" type="submit">Register</v-btn>


  </v-form>

<v-progress-circular
      v-if="loading"
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
</v-layout>
</v-slide-y-transition>
  </v-container>
</template>

<script>
/* eslint-disable */
import { models } from 'feathers-vuex'
import { mapState, mapActions, mapGetters } from 'vuex'


export default {
  name: 'register',
  data: (vm) => ({
    user: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      imageUrl: '',
    },
    registering: false,
    valid: true,
    displayNameRules: [
      value => !!value || 'A Display Name is required'
    ],
    imageUrlRules: [
      value => !!value || 'An Avatar image is required'
    ],
    emailRules: [
      value => !!value || 'Email is required',
      value => /.+@.+\..+/.test(value) || 'Email must be valid'
    ],
    passwordRules: [
      value => (value && value.length < 20 && value.length >9) || 'Password must have a length of greater than 9 and less than 20'
    ],
    confirmPasswordRules: [
      v => (v === vm.user.password) || 'Passwords must match'
    ],
  }),
  computed: {
    ...mapState('users', { loading : 'isCreatePending' }),
  },
  methods: {
    register(){
       
      if(this.valid) {
        console.log(models.api)
        const user = new models.api.User(this.user)
        user.save().then(user => {
          console.log((user))
          this.$router.push('/login')
        })

        console.log('User ', user)
        console.log('registering NOW', this.user)
      }
    }
  }
}
</script>
