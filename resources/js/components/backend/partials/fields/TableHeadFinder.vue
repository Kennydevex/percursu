<template>
  <div>
    <v-toolbar color="white" flat>
      <v-text-field
        flat
        solo
        prepend-icon="mdi-magnify"
        placeholder="Procurar utilizador na tabela..."
        v-model="search"
        hide-details
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-btn icon>
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
    props: ['search']
}
</script>