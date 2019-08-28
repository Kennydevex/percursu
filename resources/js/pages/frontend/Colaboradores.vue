<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <app-map></app-map>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="transparent" flat class="mt-2">
          <!-- <v-toolbar color="white" class="elevation-1">
            <v-text-field
              flat
              solo
              prepend-icon="mdi-magnify"
              placeholder="Procurar..."
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <v-btn icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
          </v-toolbar> -->

          <v-card-text class="mt-2 pa-0">
            <v-layout row wrap>
              <template v-for="(partner, index) in activedPartners">
                <v-flex xs12 md3 :key="index">
                  <!-- <v-card>
                    <v-img class="mx-2" :src="`/images/geral/slide1.jpg`" height="200px" contain></v-img>

                    <v-card-title primary-title>
                      <div>
                        <h3 class="headline mb-0">{{partner.folk.name}}</h3>
                        <div>description</div>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        outlined
                        small
                        rounded
                        color="primary"
                        @click="onViewPartner(partner.folk.user.username)"
                      >Ver</v-btn>
                      <v-btn text outlined small rounded color="primary">text</v-btn>
                    </v-card-actions>
                  </v-card>-->

                  <v-card>
                    <v-list-item>
                      <v-list-item-avatar color="grey"></v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
                        <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-img :src="`/images/geral/slide1.jpg`" height="194"></v-img>

                    <v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>

                    <v-card-actions>
                      <v-btn  @click="onViewPartner(partner.folk.user.username)" text color="deep-purple accent-4">Ver</v-btn>
                      <!-- <v-btn text color="deep-purple accent-4">Bookmark</v-btn> -->
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>mdi-share-variant</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AppMap from "@pfront/AppMap";
import { getPartnersDatas } from "@mixins/HelpersData";

export default {
  mixins: [getPartnersDatas],
  components: {
    AppMap
  },

  methods: {
    onViewPartner: function(username) {
      this.$router.push({ name: "view-front-partner", params: { username } });
    }
  }
};
</script>