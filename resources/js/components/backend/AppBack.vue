<template>
  <v-app>
    <v-navigation-drawer
      :dark="dark"
      app
      hide-overlay
      clipped
      v-model="drawer"
      :mini-variant.sync="mini"
      stateless
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="`/images/folks/avatar/${authUser.folk.avatar}`"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{authUser.folk.name}}</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <!-- <v-list >
        <v-list-item>
          <v-list-item-content>
            <v-text-field single-line outlined rounded prepend-inner-icon="mdi-magnify" name="name" label="Procurar" id="id"></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </v-list>-->

      <perfect-scrollbar>
        <v-list dense>
          <template v-for="(item, i) in menus">
            <v-list-group
              v-if="item.items"
              :key="item.name"
              :group="item.group"
              :prepend-icon="item.icon"
              no-action="no-action"
            >
              <v-list-item slot="activator">
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <template v-for="(subItem, i) in item.items">
                <v-list-group
                  v-if="subItem.items"
                  :key="subItem.name"
                  :group="subItem.group"
                  sub-group="sub-group"
                >
                  <v-list-item slot="activator">
                    <v-list-item-content>
                      <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    v-for="(grand, i) in subItem.children"
                    :key="i"
                    :to="genChildTarget(item, grand)"
                    :href="grand.href"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ grand.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>

                <v-list-item
                  v-else
                  :key="i"
                  :to="genChildTarget(item, subItem)"
                  :href="subItem.href"
                  :disabled="subItem.disabled"
                  :target="subItem.target"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      <span>{{ subItem.title }}</span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action v-if="subItem.action">
                    <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list-group>
            <v-subheader
              :style=" mini ?'display: none': ''"
              v-else-if="item.header"
              :key="i"
            >{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :key="i"></v-divider>
            <!-- top-level link-->
            <v-list-item
              v-else
              :to="!item.href ? { name: item.name } : null"
              :href="item.href"
              :disabled="item.disabled"
              :target="item.target"
              rel="noopener"
              :key="item.name"
            >
              <v-list-item-action v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action v-if="item.subAction">
                <v-icon class="success--text">{{ item.subAction }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </perfect-scrollbar>
    </v-navigation-drawer>
    <!-- =============================================== -->

    <v-app-bar app clipped-left fixed elevation="1" dark color="cyan darken-4">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Percursu</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text icon>
            <v-avatar size="28px">
              <img :src="`/images/folks/avatar/${authUser.folk.avatar}`" alt="Avatar" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list shaped>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="!item.href ? { name: item.name } : null"
              :href="item.href"
              @click="item.click"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- =============================================== -->

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- =============================================== -->

    <v-footer app absolute>
      <span class="caption">Percursu &copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
      <span class="caption mr-1"></span> Estefanio Silva
    </v-footer>
  </v-app>
</template>

<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";

import menu from "@api/backend/menu";
export default {
  data() {
    return {
      drawer: true,
      menus: menu,
      dark: false,
      mini: true,
      scrollSettings: {
        maxScrollbarLength: 160
      },

      items: [
        {
          icon: "mdi-account-card-details",
          href: "#",
          title: "Meu Perfil",
          click: e => {
            this.$router.push({ name: "front-perfil" });
          }
        },
        {
          icon: "mdi-home",
          href: "#",
          title: "Início",
          click: e => {
            this.$router.push({ name: "home" });
          }
        },
        {
          icon: "mdi-logout",
          href: "#",
          title: "Terminar Sessão",
          click: e => {
            this.logout();
          }
        }
      ]
    };
  },

  components: {
    PerfectScrollbar
  },

  methods: {
    genChildTarget(item, subItem) {
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component
        };
      }
      return { name: `${item.group}/${subItem.name}` };
    },

    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/");
    }
  }
};
</script>

<style lang="stylus" scoped>
// @import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl';
#appDrawer {
  overflow: hidden;

  .drawer-menu--scroll {
    height: calc(100vh - 48px);
    overflow: auto;
  }
}
</style>