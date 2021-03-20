<template>
  <div class="home">
    <v-app-bar
      app
      color="black"
      flat
      max-width="400"
      class="mx-auto"
    >
      <v-app-bar-nav-icon @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>Back to stories</v-toolbar-title>
    </v-app-bar>
    <v-card
      max-width="400"
      class="mx-auto elevation-0"
      tile
    >
      <v-list-item>
        <v-list-item-avatar color="grey">
          <v-img
            class="elevation-6"
            src="https://api.adorable.io/avatars/100/gridmaniac@gmail.com.png"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">Story</v-list-item-title>
          <v-list-item-subtitle>by Evan You</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn outlined color="teal">
            <v-icon left>mdi-account-details</v-icon>
            User page
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-card-title>
        <v-chip-group
          multiple
          column
          active-class="primary--text"
          v-model="selection"
        >
          <v-chip filter v-for="tag in tags" :key="tag.title">
            <v-icon left v-if="tag.has">mdi-plus</v-icon>
            {{ tag.title }}
          </v-chip>
        </v-chip-group>
      </v-card-title>

      <!-- <v-img
        src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
        height="194"
      ></v-img> -->

      <v-card-text>
        Visit ten places on our planet that are undergoing the biggest changes today. Visit ten places on our planet that are undergoing the biggest changes today. Visit ten places on our planet that are undergoing the biggest changes today. Visit ten places on our planet that are undergoing the biggest changes today.
        <br><br>Visit ten places on our planet that are undergoing the biggest changes today.
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
          <v-row
            align="center"
            justify="start"
          >
            <v-icon @click.stop="like = !like" :color="like ? 'pink' : ''" class="mr-1">
              {{ like ? 'mdi-heart' : 'mdi-heart-outline'}}
            </v-icon>
            <span class="subheading mr-2">256</span>
            <v-spacer></v-spacer>
            <v-icon class="mr-1">mdi-comment-text-multiple</v-icon>
            <span class="subheading">2</span>
            <v-spacer></v-spacer>
            <v-menu
              transition="slide-y-transition"
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, i) in menu"
                  :key="i"
                  @click="test"
                >
                  <v-list-item-avatar><v-icon>{{ item.icon }}</v-icon></v-list-item-avatar>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                  <v-list-item-action></v-list-item-action>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>

    <v-card
      max-width="400"
      class="mx-auto mt-4"
    >
      <v-card-title>Comments</v-card-title>
      <v-list three-line>
        <template v-for="(item, index) in comments">
          <v-divider
            v-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item
            v-else
            :key="item.title"
            @click="test"
          >
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <!-- <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle> -->
              <span class='mt-2' style="font-size:0.875rem;line-height: 1.4;"><span class="font-weight-bold">{{ item.to }} &mdash;</span> <span style="opacity:0.7">{{ item.subtitle }}</span></span>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>

    <v-footer fixed class="px-0 py-2 mx-auto" max-width="400" app>
      <v-toolbar class="elevation-0">
        <v-text-field
          solo
          flat
          hide-details
          prepend-inner-icon="mdi-comment-edit-outline"
          single-line
          placeholder="Leave comment"
        ></v-text-field>
        <v-btn icon class="ml-2">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-toolbar>
    </v-footer>

    <v-dialog
      v-model="photoViewer"
      transition="fab-transition"
      overlay-opacity="0.8"
    >
      <v-row class="fill-height ma-0">
        <v-carousel
          v-touch="{
            up: () => hidePhoto(),
            down: () => hidePhoto()
          }"
          :show-arrows="false"
          hide-delimiters
        >
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-row>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Story',

  data () {
    return {
      photoViewer: false,
      tags: [
        { title: 'Work', has: false },
        { title: 'Home Improvement', has: true }
      ],
      like: false,
      list: [
        1,
        2,
        3
      ],
      menu: [
        { title: 'Mark as inappropriate', icon: 'mdi-shield-star' },
        { title: 'Start chat', icon: 'mdi-chat' }
      ],
      comments: [
        {
          avatar: 'https://api.adorable.io/avatars/100/gridmaniac@gmail.com.png',
          title: 'Evan You',
          to: 'Ali Connors',
          subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out? I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://api.adorable.io/avatars/100/morozenka.nyam@gmail.com.png',
          title: 'Evan You 2',
          to: 'Ali Connors',
          subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out? I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true }
      ],
      selection: [
        0
      ],
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  },
  created () {
    this.$vuetify.goTo(0, { duration: 0 })
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
    test () {
      alert()
    }
  }
}
</script>
