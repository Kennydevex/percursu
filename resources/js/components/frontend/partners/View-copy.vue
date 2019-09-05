<template>
  <v-container grid-list-xs fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12 text-xs-center>
            <v-parallax height="300" :src="'images/geral/loginback.jpeg'">
              <div>
                <v-avatar size="150" color="teal lighten-3">
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
                <v-card>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">he1adline</h3>
                      <div>description</div>
                    </div>
                  </v-card-title>
                  <v-card-text>{{partner}}</v-card-text>
                  <v-card-actions>
                    <v-btn color="primary">text</v-btn>
                    <v-btn color="primary">text</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import ViewPartner from "@back/percursu/partners/View";
import { getChargesDatas, getPartnersDatas } from "@mixins/HelpersData";

export default {
  mixins: [getPartnersDatas],
  data() {
    return {
      username: this.$route.params.username,
      partner: []
    };
  },

  created() {
    this.getSinglePartiner(this.username);
  },
  // components: {
  //   ViewPartner
  // },
  methods: {
    getSinglePartiner: function(username) {
      if (this.partners.length > 0) {
        this.partner = this.partners.find(
          partner => partner.folk.user.username == username
        );
      } else {
        axios
          .get("/api/v1/percursu/partners/" + username)
          .then(response => {
            this.partner = response.data.data;
          })
          .catch(error => {});
      }
    }
  }
};
</script>