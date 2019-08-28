<template>
  <v-navigation-drawer v-model="drawer" app disable-resize-watcher disable-route-watcher>
    <v-list dense>
      <v-list-item @click="teste">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Inicial</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="teste">
        <v-list-item-action>
          <v-icon>mdi-email</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
    props: ['drawer'],
}
</script>