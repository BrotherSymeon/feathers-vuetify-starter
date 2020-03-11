<template>
  <v-app>
    <v-app-bar
    app
    >
      <v-toolbar-title>Trello Clone</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items v-if="!payload">
      <v-btn :to="{ name: 'Register'}">
         Register 
      </v-btn>

      <v-btn :to="{name: 'Login'}">
        Login
      </v-btn>
      </v-toolbar-items>
      
      <v-toolbar-items v-if="payload">
        <v-btn @click.stop="logoutUser" > 
          Logout
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>
    <v-content>
    <router-view />

    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',
  data: () => ({
    //
  }),
  computed: {
    ...mapState('auth', {payload: 'payload'}),
  },
  methods: {
    ...mapActions('auth', {logout: 'logout'}),
    logoutUser() {
      this.logout().then(() => {
        this.$router.push('/login')
      });
    }
  }
};
</script>
