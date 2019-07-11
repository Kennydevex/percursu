<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center>
        <v-parallax :src="'images/geral/loginback.jpeg'">
        <div>
          <v-avatar size="200" color="teal lighten-3">
            <img :src="'images/users/avatars/default.svg'" alt="alt" />
          </v-avatar>
          </div>
        </v-parallax>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card flat tile>
              <v-tabs v-model="value" color="primary" dark slider-color="primary">
                <v-tab ripple>tabText</v-tab>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>cardText</v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </div>
</template>

