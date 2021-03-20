<template>
  <div class="user">
    <v-app-bar
      app
      color="black"
      max-width="400"
      class="mx-auto"
    >
      <v-btn icon @click="back">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>user1202412</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-chat</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card
      class="mx-auto mb-2"
      max-width="400"
      color="transparent"
      flat
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">USER PROFILE</div>
          <v-list-item-title class="headline mb-1 yellow--text">user1202412</v-list-item-title>
          <v-list-item-subtitle>Was here around 2 days ago</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar size="80">
          <v-img
            class="elevation-6"
            src="https://api.adorable.io/avatars/100/gridmaniac@gmail.com.png"
          ></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <!-- <v-btn text color="primary">Write message</v-btn>
        <v-btn text>Button</v-btn> -->
        <v-chip-group
          multiple
          column
          active-class="primary--text"
          v-model="selection"
        >
          <v-chip @click.stop="test2" filter v-for="tag in tags" :key="tag.title">
            <v-icon left v-if="tag.has">mdi-plus</v-icon>
            {{ tag.title }}
          </v-chip>
        </v-chip-group>
      </v-card-actions>
    </v-card>
    <v-card
      class="mx-auto mb-2 elevation-5"
      max-width="400"
      tile
      @click="openStory"
      v-for="item in list" :key="item.message"
      :ripple="false"
    >
      <v-card-title>
        <v-chip-group
          multiple
          column
          active-class="primary--text"
          v-model="selection"
        >
          <v-chip @click.stop="test2" filter v-for="tag in tags" :key="tag.title">
            <v-icon left v-if="tag.has">mdi-plus</v-icon>
            {{ tag.title }}
          </v-chip>
        </v-chip-group>
      </v-card-title>

      <v-card-text class="text-subtitle-1">
        Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.
      </v-card-text>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="n in 2"
            :key="n"
            class="d-flex child-flex"
            cols="4"
          >
            <v-card flat tile class="d-flex">
              <v-img
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                aspect-ratio="1"
                class="grey lighten-2"
                @click.stop="showPhoto"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar @click.stop="showUser" color="grey darken-3">
            <v-img
              class="elevation-6"
              src="https://api.adorable.io/avatars/100/gridmaniac@gmail.com.png"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Evan You</v-list-item-title>
          </v-list-item-content>

          <v-row
            align="center"
            justify="end"
          >
            <v-icon @click.stop="like = !like" :color="like ? 'pink' : ''" class="mr-1">
              {{ like ? 'mdi-heart' : 'mdi-heart-outline'}}
            </v-icon>
            <span class="subheading mr-2">256</span>
            <!-- <span class="mr-1">·</span> -->
            <v-icon class="mr-1">mdi-comment-text-multiple</v-icon>
            <span class="subheading">2</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'User',

  data () {
    return {
      tags: [
        { title: 'Work', has: false },
        { title: 'Home Improvement', has: false },
        { title: 'Home Improvement', has: false },
        { title: 'Home Improvement', has: false }
      ],
      photoViewer: false,
      selection: [
        0
      ],
      list: [
        1, 2, 3, 4, 5, 6, 7, 8
      ],
      like: false
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    showPhoto () {
      this.photoViewer = true
    },
    hidePhoto () {
      this.photoViewer = false
    },
    openStory () {
      this.$router.push('story')
    }
  }
}
</script>

<style scoped>
/* .application--dialog-opened{
  overflow: hidden !important;
} */

.fade-leave-to {
  opacity: 0;
  transform: translateY(2em);
}

.fade-leave-active {
  transition: all .2s ease;
}
</style>
