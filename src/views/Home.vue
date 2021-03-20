<template>
  <div class="home">
    <v-app-bar
      app
      hide-on-scroll
      color="black"
      :scroll-threshold="50"
      max-width="400"
      class="mx-auto"
    >
      <v-menu
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="mr-1" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in menu"
            :key="i"
            @click="test2"
          >
            <v-list-item-avatar><v-icon>{{ item.icon }}</v-icon></v-list-item-avatar>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-action></v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-autocomplete
        :items="items"
        cache-items
        flat
        dense
        hide-no-data
        hide-details
        label="What is your biggest imperfection?"
        class="text-small"
        solo
        clearable
      ></v-autocomplete>
      <!-- <v-btn class="ml-1" icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>{{ (!$vuetify.theme.dark) ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn> -->
      <v-btn class="ml-1" @click="test2" icon>
        <v-badge
          color="pink"
          overlap
          content="6"
        >
          <v-icon>mdi-chat</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <vue-data-loading :loading="loading" :completed="completed" :listens="['infinite-scroll', 'pull-down']" :init-scroll="true" @infinite-scroll="infiniteScroll" @pull-down="pullDown">
      <div slot="pull-down-ready">ready to refresh</div>
      <div slot="infinite-scroll-loading">loading...</div>
      <div slot="pull-down-loading">updating...</div>
      <div slot="completed">It's all for now!</div>
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
    </vue-data-loading>

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
    <v-btn
      fab
      bottom
      right
      fixed
      @click="newStory"
      style="z-index:0"
    >
      <v-icon>mdi-pencil-plus</v-icon>
    </v-btn>
    <v-bottom-sheet v-model="signup" persistent>
      <v-sheet class="text-center" height="400px">
        <v-btn
          class="mt-6"
          text
          color="pink"
          @click="signup = !signup"
        >Not now</v-btn>
        <div class="py-3">We need at least your email to create account.</div>
        <v-container class="py-0">
          <v-row justify="center">
            <v-col
              cols="10"
            >
              <v-form v-model="valid">
                <v-text-field
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  required
                  flat
                  solo-inverted
                ></v-text-field>
              </v-form>
              <v-btn block large outlined>Continue</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
    <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    </v-dialog> -->
    <InstallPopup/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import InstallPopup from '@/components/InstallPopup'
import VueDataLoading from 'vue-data-loading'

export default {
  name: 'Home',
  components: {
    InstallPopup,
    VueDataLoading
  },
  data () {
    return {
      signup: false,
      photoViewer: false,
      loading: false,
      completed: false,
      page: 1,
      tags: [
        { title: 'Work', has: false },
        { title: 'Home Improvement', has: true }
      ],
      like: false,
      dialog: false,
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      email: '',
      list: [1, 2, 3],
      menu: [
        { title: 'New story', icon: 'mdi-pencil-plus' },
        { title: 'My user page', icon: 'mdi-account' }
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
  watch: {
    // photoViewer (val) {
    //   document.querySelector('html').classList.toggle('application--dialog-opened', val)
    // }
  },
  methods: {
    showPhoto () {
      this.photoViewer = true
    },
    hidePhoto () {
      this.photoViewer = false
    },
    openStory () {
      this.$router.push('story')
    },
    showUser () {
      this.$router.push('user')
    },
    newStory () {
      // signup = !signup
      // this.dialog = true
      this.$router.push('new')
    },
    test2 () {
      // alert('not-card')
    },
    fetchData () {
      this.loading = true
      setTimeout(() => {
        if (this.page > 3) {
          this.completed = true
          this.loading = false
          return
        }
        const temp = []
        for (let i = this.list.length + 1; i <= this.list.length + 5; i++) {
          temp.push(i)
        }
        this.list = this.list.concat(temp)
        this.loading = false
      }, 0)
    },
    pullUp () {
      this.fetchData()
      this.page++
    },
    pullDown () {
      // this.list = []
      this.page = 1
      this.completed = false
      this.fetchData()
    },
    infiniteScroll () {
      this.fetchData()
      this.page++
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
