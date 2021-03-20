<template>
  <v-app>
    <v-main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-main>
    <!-- <v-bottom-navigation
      app
      :value="activeBtn"
      color="teal"
      fixed
      height="52"
    >
      <v-btn x-large>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn x-large>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn @click="signup = !signup" x-large>
        <v-icon large>mdi-pencil-plus</v-icon>
      </v-btn>

      <v-btn x-large>
        <v-badge
          color="pink"
          overlap
          content="6"
        >
          <v-icon>mdi-chat</v-icon>
        </v-badge>
      </v-btn>
      <v-btn x-large>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation> -->
  </v-app>
</template>

<script>

export default {
  name: 'App',

  // created () {
  //   window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  //     const newColorScheme = e.matches ? 'dark' : 'light'
  //     alert(newColorScheme)
  //   })
  // },
  data: () => ({
    activeBtn: 0,
    valid: true,
    emailRules: null,
    email: ''
  })
}
</script>

<style>
  /* .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(2em);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease;
  } */
</style>
