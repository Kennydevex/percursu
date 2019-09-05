<template>
  <div>
    <v-navigation-drawer permanent absolute v-model="value">
     <v-container grid-list-md>
       <v-layout row wrap>
       <v-flex xs12>
         <v-btn color="success" block>text</v-btn>
       </v-flex>

        <v-flex xs12>
         <v-btn color="success" block>text</v-btn>
       </v-flex>

        <v-flex xs12>
         <v-btn color="success" block>text</v-btn>
       </v-flex>
     </v-layout>
     </v-container>
    </v-navigation-drawer>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12>
          <v-content>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis corrupti veritatis molestiae at mollitia expedita deleniti enim debitis odit. Iste vitae sequi dolores? Asperiores earum dolorum molestias laborum hic quibusdam?</v-content>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
  

<script>
// import ViewPartner from "@back/percursu/partners/View";
import { getChargesDatas, getPartnersDatas } from "@mixins/HelpersData";

export default {
  mixins: [getPartnersDatas],
  data() {
    return {
      itens: [{ icon: "mdi-home", title: "Home" }],
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
