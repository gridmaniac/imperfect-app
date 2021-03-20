<template>
  <div class="new">
    <v-app-bar
      app
      color="black"
      max-width="400"
      class="mx-auto"
    >
      <v-btn icon @click="back">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>New story</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="dialog = false">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card>
      <!-- <v-toolbar color="black">
        <v-btn icon @click="back">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>New story</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-toolbar> -->
      <v-container>
        <v-row>
          <v-col cols="12" class="py-0">
            <v-textarea
              ref="textArea"
              flat
              auto-grow
              counter="600"
              solo
              placeholder="What is your biggest imperfection?"
            >
            </v-textarea>
          </v-col>
          <v-col cols="12">
            <v-combobox
              v-model="select"
              :items="tagsFlat"
              solo
              flat
              label="Add thematics"
              prepend-inner-icon="mdi-plus"
              multiple
              hide-details
              deletable-chips
              chips
            ></v-combobox>
          </v-col>
        </v-row>
        <v-divider></v-divider>
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
        <v-row justify="center" align="center">
          <v-col cols="2" class="py-0">
            <v-file-input
              hide-input
              multiple
              prepend-icon="mdi-camera-plus"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-container>
      <v-btn
        fab
        top
        right
        fixed
        small
        class="mt-14"
      >
        <v-icon>mdi-emoticon-neutral</v-icon>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'NewStory',

  data () {
    return {
      select: [],
      tagsFlat: [
        'Work', 'Home Improvment'
      ]
    }
  },
  created () {
    this.$vuetify.goTo(0, { duration: 0 })
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
