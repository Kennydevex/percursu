<template>

  <v-toolbar clipped-left app fixed color="primary" dark>
    <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    <v-toolbar-title>Percursu</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn href="mailto:kenny.devex@gmail.com">
      Admin
    </v-btn>

    <v-btn icon @click="handleFullScreen()">
      <v-icon>mdi-fullscreen</v-icon>
    </v-btn>

    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn icon large flat slot="activator">
        <v-avatar size="30px">
          <img :src="'images/users/account.svg'" alt="Estefanio Silva"/>
        </v-avatar>
      </v-btn>
      <v-list class="pa-0">
        <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

  </v-toolbar>
</template>

<script>
import Util from '@util'
export default {
  name: 'app-toolbar',

  data () {
    return {
      items: [
        {
          icon: 'mdi-account-card-details',
          href: '#',
          title: 'Perfil',
          click: (e) => {
            console.log(e);
          }
        },
        {
          icon: 'mdi-home',
          href: '#',
          title: 'Inicial',
          click: (e) => {
            this.$router.push({path: '/'})
          }
        },
        {
          icon: 'mdi-settings',
          href: '#',
          title: 'Conf',
          click: (e) => {
            console.log(e);
          }
        },
        {
          icon: 'mdi-logout',
          href: '#',
          title: 'Sair',
          click: (e) => {
            this.logout()
          }
        }
      ],
    }
  },
 

  methods: {

    logout: function () {
      // this.$store.commit('logout')
      // this.$router.push('/login')
    },

    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen()
    }
  }
}
</script>

<style lang="css">
</style>
