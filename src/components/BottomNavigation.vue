<template>
  <v-bottom-navigation
    :value="activeBtn"
    grow
    color="teal"
    fixed
  >
    <v-btn x-large>
      <span>Recents</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn x-large>
      <span>Favorites</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn x-large>
      <span>Nearby</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {

  data () {
    return {
      bottomNav: 3
    }
  }
}
</script>
