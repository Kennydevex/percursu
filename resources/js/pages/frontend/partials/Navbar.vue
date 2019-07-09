<template>
  <v-toolbar app card dark color="primary" height="60">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Percursu</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-layout row wrap align-content-center align-center fill-height>
        <v-flex xs12>
          <v-btn :to="{name: 'home'}" class="pa-2" round flat>
            <v-icon>mdi-home-group</v-icon>
          </v-btn>
          <v-btn :to="{name: 'colaboradores'}" class="pa-2" round flat>Colaboradores</v-btn>
          <v-btn :to="{name: 'empregos'}" class="pa-2" round flat>Empregos</v-btn>
          <v-btn :to="{name: 'formacoes'}" class="pa-2" round flat>Formações</v-btn>

          <template v-if="!authUser">
            <v-btn :to="{name: 'login'}" fab class="pa-2" flat>
              <v-icon left>mdi-login</v-icon>
            </v-btn>
          </template>

          <template v-else>
            <v-menu
              nudge-bottom="5"
              left
              attach
              offset-y
              origin="center center"
              :nudge-width="100"
              transition="scale-transition"
              flat
            >
              <v-btn icon large flat slot="activator">
                <v-avatar color="teal lighten-2" size="30px">
                  <img
                    :src="`/images/users/avatars/${authUser.folk.avatar}`"
                    alt="Estefanio Silva"
                  />
                </v-avatar>
              </v-btn>
              <v-list class="pa-0">
                <v-list-tile
                  v-for="(item,index) in items"
                  :to="!item.href ? { name: item.name } : null"
                  :href="item.href"
                  @click="item.click"
                  ripple="ripple"
                  :disabled="item.disabled"
                  :target="item.target"
                  rel="noopener"
                  :key="index"
                >
                  <v-list-tile-action v-if="item.icon">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </template>
        </v-flex>
      </v-layout>
    </v-toolbar-items>
  </v-toolbar>
</template>
        </v-flex>
      </v-layout>
    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-account-card-details",
          href: "#",
          title: "Perfil",
          click: e => {
            console.log(e);
          }
        },
        {
          icon: "mdi-view-dashboard-variant",
          href: "#",
          title: "Admin",
          click: e => {
            this.$router.push({ name: "dashboard" });
          }
        },
        {
          icon: "mdi-logout",
          href: "#",
          title: "Sair",
          click: e => {
            this.logout();
          }
        }
      ]
    };
  },

  computed: {
    authUser: function() {
      return this.$store.getters.authUser;
    }
  },

  methods: {
    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/");
    }
  }
};
</script>